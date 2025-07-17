import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import HorizontalLayout from './HorizontalLayout';

const Sidebar = ({ layoutType }) => {
  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName('vertical-overlay');
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener('click', function () {
        document.body.classList.remove('vertical-sidebar-enable');
      });
    }
  });

  return (
    <React.Fragment>
      <div className='app-menu navbar-menu bg-transparent'>
        <div id='scrollbar'>
          <div>
            <ul className='navbar-nav align-items-center' id='navbar-nav'>
              <HorizontalLayout />
            </ul>
          </div>
        </div>
      </div>
      <div className='vertical-overlay'></div>
    </React.Fragment>
  );
};

export default Sidebar;
