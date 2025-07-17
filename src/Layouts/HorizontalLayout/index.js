import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse, Col, Row } from 'reactstrap';
import withRouter from '../../Components/Common/withRouter';
import './index.css';
import navdata from '../LayoutMenuData';
import { withTranslation } from 'react-i18next';

const HorizontalLayout = (props) => {
  const navData = navdata().props.children;
  const location = useLocation();

  const isMainLinkActive = (item) => {
    if (item.subItems) {
      return item.subItems.some(
        (subItem) => location.pathname === subItem.link
      );
    }
    return location.pathname === item.link;
  };

  function DropDownLinks({ subItem }) {
    return (
      <li className='nav-item d-flex align-items-center'>
        {!subItem.isChildItem ? (
          <>
            <i
              className={`${subItem.icon} fs-14 me-n3 ms-3 text-muted`}
              style={{ minWidth: '14px' }}
            ></i>
            <Link
              to={subItem.link ? subItem.link : '/#'}
              className='nav-link fs-14'
              style={{
                inlineSize: 'max-content',
                color:
                  location.pathname === subItem.link ? '#0a1335' : '#878a99',
              }}
            >
              {props.t(subItem.label)}
            </Link>
          </>
        ) : (
          <React.Fragment>
            <Link
              onClick={subItem.click}
              className='nav-link text-light'
              to='/#'
              data-bs-toggle='collapse'
              style={{ inlineSize: 'max-content' }}
            >
              {props.t(subItem.label)}
            </Link>
            <Collapse
              className='menu-dropdown'
              isOpen={subItem.stateVariables}
              id='sidebarEcommerce'
            >
              <ul className='nav nav-sm flex-column'>
                {subItem.childItems.map((subChildItem, key) => (
                  <li className='nav-item' key={subChildItem + key}>
                    <Link
                      to={subChildItem.link ? subChildItem.link : '/#'}
                      className='nav-link text-uppercase'
                      style={{
                        inlineSize: 'max-content',
                        color:
                          location.pathname === subChildItem.link
                            ? '#0a1335'
                            : '#878a99',
                      }}
                    >
                      {props.t(subChildItem.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </Collapse>
          </React.Fragment>
        )}
      </li>
    );
  }

  return (
    <React.Fragment>
      {navData.map((item, key) => (
        <React.Fragment key={item.label + key}>
          {!item.isHeader && (
            <li className='nav-item' style={{ width: '400px' }}>
              {item.subItems ? (
                <React.Fragment>
                  <Link
                    onClick={item.click}
                    className='nav-link menu-link px-2 text-uppercase'
                    to={item.link ? item.link : '/#'}
                    data-bs-toggle='collapse'
                    style={{
                      inlineSize: 'max-content',
                    }}
                  >
                    <i
                      className={`${item.icon} fw-light fs-15  me-1`}
                      style={{
                        color: isMainLinkActive(item) ? '#ffff00' : 'white',
                        minWidth: '14px',
                      }}
                    ></i>
                    <span
                      className='fw-light text-uppercase fs-15'
                      data-key='t-apps'
                      style={{
                        color: isMainLinkActive(item) ? '#ffff00' : 'white',
                      }}
                    >
                      {props.t(item.label)}
                    </span>
                  </Link>
                  <Collapse
                    className={
                      item.id === 'baseUi' && item.subItems.length > 13
                        ? 'menu-dropdown mega-dropdown-menu'
                        : 'menu-dropdown text-uppercase'
                    }
                    isOpen={item.stateVariables}
                    id='sidebarApps'
                    style={{
                      width: `${item.subItems.length > 5 ? '800px' : ''}`,
                      left: `${item.subItems.length > 5 ? '9px' : ''}`,
                    }}
                  >
                    {item.id === 'baseUi' && item.subItems.length > 13 ? (
                      <Row>
                        {item.subItems.map((subItem, key) => (
                          <Col lg={4} key={subItem.label + key}>
                            <ul className='nav nav-sm flex-column'>
                              <li className='nav-item '>
                                <Link
                                  to={subItem.link}
                                  className='nav-link '
                                  style={{
                                    inlineSize: 'max-content',
                                    color:
                                      location.pathname === subItem.link
                                        ? '#ffff00'
                                        : '#878a99',
                                  }}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            </ul>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <div className='d-flex gap-2'>
                        <ul className='nav nav-sm flex-column test'>
                          {item.subItems.slice(0, 5).map((subItem, index) => (
                            <DropDownLinks
                              subItem={subItem}
                              key={subItem + index}
                            />
                          ))}
                        </ul>

                        <ul className='nav nav-sm flex-column test'>
                          {item.subItems.slice(5, 10).map((subItem, index) => (
                            <DropDownLinks
                              subItem={subItem}
                              key={subItem + index}
                            />
                          ))}
                        </ul>
                        <ul className='nav nav-sm flex-column test'>
                          {item.subItems.slice(10, 15).map((subItem, index) => (
                            <DropDownLinks
                              subItem={subItem}
                              key={subItem + index}
                            />
                          ))}
                        </ul>
                        <ul className='nav nav-sm flex-column test'>
                          {item.subItems.slice(15, 20).map((subItem, index) => (
                            <DropDownLinks
                              subItem={subItem}
                              key={subItem + index}
                            />
                          ))}
                        </ul>
                      </div>
                    )}
                  </Collapse>
                </React.Fragment>
              ) : (
                <Link
                  className='nav-link menu-link px-2'
                  to={item.link ? item.link : '/#'}
                  style={{
                    inlineSize: 'max-content',
                    color:
                      location.pathname === item.link ? '#ffff00' : 'white',
                  }}
                >
                  <i
                    className={`${item.icon} fs-15 me-1`}
                    style={{ minWidth: '14px' }}
                  ></i>
                  <span
                    className='text-uppercase fs-15'
                    style={{
                      color:
                        location.pathname === item.link ? '#ffff00' : 'white',
                    }}
                  >
                    {props.t(item.label)}
                  </span>
                </Link>
              )}
            </li>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(HorizontalLayout));
