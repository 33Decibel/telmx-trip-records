import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navdata = () => {
  const history = useNavigate();

  const { loggedInUser } = useSelector((state) => ({
    loggedInUser: state.Login.user,
  }));

  const userId = loggedInUser?.user?.id || loggedInUser?.id;
  const isAdmin = String(userId) === '1';

  const [isCRM, setIsCRM] = useState(false);
  const [iscurrentState, setIscurrentState] = useState('CRM');
  const [isPortal, setIsPortal] = useState(false);

  function updateIconSidebar(e) {
    if (e?.target?.getAttribute('subitems')) {
      const ul = document.getElementById('two-column-menu');
      const iconItems = ul.querySelectorAll('.nav-icon.active');
      [...iconItems].forEach((item) => {
        item.classList.remove('active');
        const id = item.getAttribute('subitems');
        const subMenu = document.getElementById(id);
        if (subMenu) subMenu.classList.remove('show');
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove('twocolumn-panel');
    if (iscurrentState !== 'CRM') setIsCRM(false);
    if (iscurrentState !== 'Portal') setIsPortal(false);
  }, [history, iscurrentState]);

  const menuItems = isAdmin
    ? [
        {
          label: 'Menu',
          isHeader: true,
        },
        {
          id: 'home',
          label: 'Home',
          icon: 'bx bx-home',
          link: '/',
        },
        {
          id: 'categories',
          label: 'Categories',
          icon: 'ri-folder-line',
          link: '/categories',
        },
        {
          id: 'category-groups',
          label: 'Category Groups',
          icon: 'ri-folders-line',
          link: '/category-groups',
        },
        {
          id: 'ticket-tat',
          label: 'TATs',
          icon: 'ri-time-line',
          link: '/ticket-tat',
        },
      ]
    : [];

  return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;
