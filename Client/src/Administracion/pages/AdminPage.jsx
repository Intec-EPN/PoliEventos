import { useEffect } from "react";
import { AdminLayout } from "../layout/AdminLayout";
import { Outlet } from "react-router-dom";
import { startLoadingAcciones, startLoadingPermisosAcciones } from "../../store/Administracion/Permisos/thunk";
import { useDispatch } from "react-redux";
import { startLoadingPermisosEstructura, startLoadingRoles } from "../../store/Administracion/Roles/thunks";

export const AdminPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingPermisosAcciones());
    dispatch(startLoadingAcciones());
    dispatch(startLoadingPermisosEstructura());
    dispatch(startLoadingRoles());
  }, [dispatch]);
  
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};
