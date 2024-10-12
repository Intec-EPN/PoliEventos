import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import { startLoadingRoles } from '../../../store/Administracion/Roles/thunks';
import { startLoadingDepartamentos } from '../../../store/Administracion/Departamentos/thunk';


export const Roles = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingRoles());
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);
  
  return (
    <>
      <Outlet />
    </>
  );
};
