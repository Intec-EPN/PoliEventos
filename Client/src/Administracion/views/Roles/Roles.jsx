import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import { startLoadingRoles } from '../../../store/Roles/thunks';

export const Roles = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingRoles());
  }, [dispatch]);
  return (
    <>
      <Outlet />
    </>
  );
};
