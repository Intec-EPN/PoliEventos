import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import { startLoadingDepartamentos } from '../../../store/Administracion/Departamentos/thunk';


export const Roles = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingDepartamentos());
  }, [dispatch]);
  
  return (
    <>
      <Outlet />
    </>
  );
};
