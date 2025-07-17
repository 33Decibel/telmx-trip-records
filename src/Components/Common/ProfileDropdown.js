import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
// import GoTPRobo from '@assets/images/anims/GoTP-Robo.gif';
//import images
import avatar1 from '../../assets/images/users/avatar-1.jpg';
import { Link } from 'react-router-dom';
const ProfileDropdown = ({ companyName }) => {
  const obj = JSON.parse(localStorage.getItem('authUser'));
  const userName = obj?.user.first_name + ' ' + obj?.user.last_name;
  const storeBranch = useSelector((state) => state.Login.user.user);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className=' header-item topbar-user bg-brand-color'
      >
        <DropdownToggle tag='button' type='button' className='btn pe-0'>
          <span className='d-flex align-items-center'>
            {storeBranch.profilePicture ? (
              <img
                className='rounded-circle header-profile-user'
                src={avatar1}
                alt='Header Avatar'
                data-tooltip-id='tooltip-primary'
                data-tooltip-content='Profile'
              />
            ) : (
              <div
                className='flex-shrink-0 avatar-xs '
                alt='Header Avatar'
                data-tooltip-id='tooltip-primary'
                data-tooltip-content='Profile'
              >
                <div className='avatar-title bg-success text-white rounded-circle fs-6 uppercase border border-white border-2'>
                  {storeBranch.first_name?.charAt(0)}
                  {storeBranch.last_name?.charAt(0)}
                </div>
              </div>
            )}

            <span className='text-start ms-xl-2 lh-1'>
              <span className='d-xl-inline-block ms-1 fw-medium user-name-text text-white '>
                {userName}
              </span>
              <span className='d-xl-block ms-1 fs-12 text-warning user-name-sub-text'>
                {companyName}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-end'>
          <h6 className='dropdown-header text-capitalize'>
            Welcome {userName}!
          </h6>
          <DropdownItem href={process.env.PUBLIC_URL + '/logout'}>
            <i className='mdi mdi-logout text-muted fs-16 align-middle me-1'></i>{' '}
            <span className='align-middle' data-key='t-logout'>
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        className='border-none-modal '
      >
        <div
          className='d-flex ps-3 pe-1 justify-content-between align-items-center text-light rounded-top'
          style={{
            height: '50px',
            backgroundColor: 'rgb(10, 19, 53)',
            border: 'none',
          }}
        >
          <section className='flex-grow fw-bold me-2 text-uppercase'>
            Select View As
          </section>
          <button
            type='button'
            className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle '
            onClick={toggle}
          >
            <i className='mdi mdi-close fs-22 text-light'></i>
          </button>
        </div>
        <ModalBody className='striped-bg rounded-bottom'>
          <div className='d-flex '>
            {/* <img src={GoTPRobo} className='w-25' alt='TelMX Robo' /> */}
            <div className='p-3 mt-2'>
              <h4 className='mb-2 fs-16'>Here you can Select Role</h4>
              <p className='text-muted mb-0 fs-14'>
                By selecting a role, you can edit the portal to hide and show
                data according to that role
              </p>
            </div>
          </div>
          <div className='input-group mb-2'>
            <label className='input-group-text bg-secondary text-light border-secondary'>
              Please Select Role
            </label>
            <select className='form-select'>
              <option>Client</option>
              <option>Transporter</option>
              <option>Sub-Vendor</option>
              <option>Driver</option>
              <option>Employee</option>
            </select>
          </div>
          <div className='d-flex justify-content-end'>
            {' '}
            <button className='btn btn-danger btn-sm' onClick={toggle}>
              Cancel
            </button>{' '}
            <button className='btn btn-primary btn-sm ms-1' onClick={toggle}>
              View
            </button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileDropdown;
