import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, Form } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import FullScreenDropdown from '../Components/Common/FullScreenDropdown';
import ProfileDropdown from '../Components/Common/ProfileDropdown';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import MobileNav from './HorizontalLayout/MobileNav';
import TelMXLogo from '../assets/images/logo/logo-light.png';

const Header = ({ headerClass }) => {
  const [search, setSearch] = useState(false);

  const { storePortalName } = useSelector((state) => ({
    storePortalName: state.Login.user.user.portals[0].portal_name,
  }));

  const { sidebarVisibilitytype } = useSelector((state) => ({
    sidebarVisibilitytype: state.Layout.sidebarVisibilitytype,
  }));
  const toogleSearch = () => {
    setSearch(!search);
  };
  return (
    <React.Fragment>
      <header
        className={`position-fixed w-100 top-0  ${headerClass}`}
        style={{ zIndex: 501 }}
      >
        <div className='layout-width bg-brand-color'>
          <div
            className='navbar-header '
            style={{ paddingRight: '11px', paddingLeft: '11px' }}
          >
            <div className='d-flex align-items-center'>
              <div className='btn-group mt-1'>
                {/* <Link
                  className='btn fs-4 text-start p-0'
                  type='button'
                  style={{ color: '#ffff00' }}
                  to='/'
                >
                  <div className='d-flex align-items-center py-4'>
                    <div
                      className='flex-grow-1 me-2 fw-light'
                      style={{ fontSize: '24px' }}
                    >
                      TelMX
                    </div>
                  </div>
                </Link> */}
                <Link to='/'>
                  <img
                    src={TelMXLogo}
                    alt='TelMX logo'
                    style={{
                      width: 'auto',
                      height: '38px',
                    }}
                  />
                </Link>
              </div>
              <button
                data-bs-toggle='offcanvas'
                href='#offcanvasExample'
                aria-controls='offcanvasExample'
                type='button'
                className='btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger'
                id='topnav-hamburger-icon'
              >
                <span className='hamburger-icon'>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
              <div
                className='offcanvas offcanvas-start border-end-0'
                tabIndex='-1'
                id='offcanvasExample'
                aria-labelledby='offcanvasExampleLabel'
                // style={{ width: '300px' }}
              >
                <MobileNav />
              </div>
              <div className='d-flex align-items-center'>
                <Sidebar />
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <Dropdown
                isOpen={search}
                toggle={toogleSearch}
                className='d-md-none topbar-head-dropdown header-item'
              >
                <DropdownToggle
                  type='button'
                  tag='button'
                  className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
                >
                  <i className='bx bx-search fs-22'></i>
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-lg dropdown-menu-end p-0'>
                  <Form className='p-3'>
                    <div className='form-group m-0'>
                      <div className='input-group'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Search ...'
                          aria-label="Recipient's username"
                        />
                        <button className='btn btn-primary' type='submit'>
                          <i className='mdi mdi-magnify'></i>
                        </button>
                      </div>
                    </div>
                  </Form>
                </DropdownMenu>
              </Dropdown>
              {/* <LanguageDropdown /> */}
              {/* <FullScreenDropdown /> */}
              {/* <button
                className='btn btn-icon btn-topbar'
                data-tooltip-id='tooltip-primary'
                data-tooltip-content='Click To Download IOS TelMX App'
                onClick={() =>
                  window.open(
                    'https://apps.apple.com/in/app/telmx/id6742321595',
                    '_blank'
                  )
                }
              >
                <i className='ri-app-store-line text-white fs-22' />
              </button>
              <button
                className='btn btn-icon btn-topbar'
                data-tooltip-id='tooltip-primary'
                data-tooltip-content='Click To Download Android TelMX App'
                onClick={() =>
                  window.open(
                    'https://play.google.com/store/apps/details?id=com.digimagic.telmx&pcampaignid=web_share',
                    '_blank'
                  )
                }
              >
                <i className='ri-google-play-line text-white fs-22' />
              </button> */}

              <ProfileDropdown companyName={storePortalName} />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
