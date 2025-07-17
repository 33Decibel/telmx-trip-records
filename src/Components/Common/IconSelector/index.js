import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { icons } from './icons';
import SimpleBar from 'simplebar-react';
import NoResultFound from '../NoResultFound';

function IconSelector({ classNames, icon, updateIconCallBack }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(
    icon || 'ri-settings-4-line'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIcons, setFilteredIcons] = useState(icons);
  const prevSelectedIcon = useRef(selectedIcon);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setFilteredIcons(
        icons.filter((icon) =>
          icon.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredIcons(icons);
    }
  }, [searchQuery]);

  const updateIcon = useCallback(() => {
    if (prevSelectedIcon.current !== selectedIcon) {
      prevSelectedIcon.current = selectedIcon;
      if (updateIconCallBack) updateIconCallBack(selectedIcon);
    }
  }, [selectedIcon, updateIconCallBack]);

  useEffect(() => {
    updateIcon();
  }, [selectedIcon, updateIcon]);

  const setNewIcon = (icon) => {
    setSelectedIcon(icon);
    setShowModal(false);
  };

  return (
    <>
      <i
        className={`${icon} ${classNames || ''}`}
        onClick={() => setShowModal(!showModal)}
      ></i>

      <Modal
        isOpen={showModal}
        size='xl'
        toggle={() => setShowModal(!showModal)}
        centered
        className='border-none-modal '
      >
        <div
          className='d-flex ps-3 pe-1 justify-content-between align-items-center text-light rounded-top'
          style={{
            height: '50px',
            backgroundColor: 'rgba(10, 19, 53,1)',
            border: 'none',
          }}
        >
          <section className='flex-grow fw-bold me-1 text-uppercase'>
            Select Suitable Icon
          </section>

          <button
            type='button'
            className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
            onClick={() => setShowModal(!showModal)}
          >
            <i className='mdi mdi-close fs-22 text-light'></i>
          </button>
        </div>
        <ModalBody className='py-3'>
          <input
            type='text'
            className='form-control mb-3'
            placeholder='Search for an icon'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SimpleBar style={{ maxHeight: '300px', height: '700px' }}>
            {filteredIcons.length > 0 ? (
              <div className='d-flex flex-wrap'>
                {filteredIcons.map((icon, index) => (
                  <button
                    key={index}
                    type='button'
                    className='btn btn-light btn-icon waves-effect m-2'
                    onClick={() => setNewIcon(icon)}
                  >
                    <i className={icon}></i>
                  </button>
                ))}
              </div>
            ) : (
              <NoResultFound />
            )}
          </SimpleBar>
        </ModalBody>
      </Modal>
    </>
  );
}

export default IconSelector;
