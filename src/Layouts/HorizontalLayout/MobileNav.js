import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Collapse, Container } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { useSelector, useDispatch } from 'react-redux';
// Import Data
import navdata from '../LayoutMenuData';
//i18n
import { withTranslation } from 'react-i18next';
import withRouter from '../../Components/Common/withRouter';

const MenuItem = ({ item, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (e) => {
    if (item.subItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (item.click) {
      item.click(e);
    }
  };

  const location = useLocation();

  return (
    <li className='nav-item'>
      <Link
        className={`nav-link menu-link align-items-center d-flex fs-14 text-uppercase pb-3 ${
          location.pathname === item.link ? 'text-brand-color' : 'text-muted'
        }`}
        to={item.link}
        onClick={handleItemClick}
        // data-bs-toggle='collapse'
      >
        <i className={`pe-2 ` + item.icon}></i>
        {item.label}
        {item.subItems && (
          <span>
            {isOpen ? (
              <i className='ps-2 ri-arrow-up-s-line'></i>
            ) : (
              <i className='ps-2 ri-arrow-down-s-line'></i>
            )}
          </span>
        )}
      </Link>
      {isOpen && item.subItems && (
        <ul className='ps-3' style={{ listStyle: 'none' }}>
          {item.subItems.map((subItem) => (
            <MenuItem key={subItem.id} item={subItem} onClick={onClick} />
          ))}
        </ul>
      )}
    </li>
  );
};

const MobileNav = (props) => {
  const layout = 'vertical';
  const navData = navdata().props.children;
  const path = props.router.location.pathname;
  const { selectedBranch } = useSelector((state) => ({
    selectedBranch: state.Login.user.branch,
  }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul = document.getElementById('navbar-nav');
      const items = ul.getElementsByTagName('a');
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (layout === 'vertical') {
      initMenu();
    }
  }, [path, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add('active');
    let parentCollapseDiv = item.closest('.collapse.menu-dropdown');

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add('show');
      parentCollapseDiv.parentElement.children[0].classList.add('active');
      parentCollapseDiv.parentElement.children[0].setAttribute(
        'aria-expanded',
        'true'
      );
      if (parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown')) {
        parentCollapseDiv.parentElement
          .closest('.collapse')
          .classList.add('show');
        if (
          parentCollapseDiv.parentElement.closest('.collapse')
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.classList.add('active');
        if (
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
        ) {
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
            .classList.add('show');
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
            .previousElementSibling.classList.add('active');
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains('active'));

    actiItems.forEach((item) => {
      if (item.classList.contains('menu-link')) {
        if (!item.classList.contains('active')) {
          item.setAttribute('aria-expanded', false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove('show');
        }
      }
      if (item.classList.contains('nav-link')) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove('show');
        }
        item.setAttribute('aria-expanded', false);
      }
      item.classList.remove('active');
    });
  };

  return (
    <React.Fragment>
      <Container fluid className='px-0'>
        <div
          className='offcanvas-header bg-brand-color'
          style={{ paddingTop: '19.5px', paddingBottom: '19.5px' }}
        >
          <div className='fw-bold  text-white fs-4'>{selectedBranch?.name}</div>
          {/* )} */}

          <button
            type='button'
            className='btn-close text-white'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
            style={{ filter: 'invert(1)' }}
          ></button>
        </div>
        <div className='offcanvas-body pe-0'>
          <SimpleBar style={{ height: '100vh' }}>
            <nav>
              <ul
                className='ps-0'
                id='two-column-menu '
                style={{ listStyle: 'none' }}
              >
                {(navData || []).map((item) =>
                  item.isHeader ? (
                    <li key={item.label} className='menu-header d-none'>
                      {item.label}
                    </li>
                  ) : (
                    <MenuItem key={item.id} item={item} />
                  )
                )}
              </ul>
            </nav>
          </SimpleBar>
        </div>
      </Container>
      {/* </SimpleBar> */}
    </React.Fragment>
  );
};

MobileNav.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(MobileNav));
