import { useEffect } from "react";
import { AdminLayout } from "../layout/AdminLayout";
import { Outlet } from "react-router-dom";
import { startLoadingAcciones, startLoadingPermisosAcciones } from "../../store/Administracion/Permisos/thunk";
import { useDispatch } from "react-redux";
import { startLoadingPermisosEstructura } from "../../store/Administracion/Roles/thunks";

// TODO NO PERMITIR CATEGORIAS CON NOMBRE IGUAL, LO MISMO CON ROLES

export const AdminPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingPermisosAcciones());
    dispatch(startLoadingAcciones());
    dispatch(startLoadingPermisosEstructura());
  }, [dispatch]);
  
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};
