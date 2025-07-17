import React, { useEffect, useState } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';

//Import actions
import {
  getMPortals,
  selectedPortal as setSelectPortalStore,
} from '@store/actions';

const CommonSubHeader = ({ title }) => {
  const dispatch = useDispatch();
  const { mPortals, selectedPortalG } = useSelector((state) => ({
    mPortals: state.Portal.mPortals,
    selectedPortalG: state.Portal.selectedPortal,
  }));

  const [selectedPortal, setSelectedPortal] = useState(selectedPortalG);
  const handlePortalChange = (id) => {
    setSelectedPortal(mPortals.filter((portal) => portal._id === id)[0]);
    dispatch(
      setSelectPortalStore(mPortals.filter((portal) => portal._id === id)[0])
    );
  };

  useEffect(() => {
    if (mPortals.length === 0)
      dispatch(
        getMPortals({ collectionName: 'portals', action: 'GET_ALL', data: {} })
      );
  }, [mPortals]);
  return (
    <div className='d-flex justify-content-between'>
      <div className='align-middle'>
        <h5 className='mb-sm-0 align-middle'>{title}</h5>
      </div>
      {/* <div>
        <h1>hi</h1>
      </div> */}
    </div>
  );
};

export default CommonSubHeader;
