import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { startLoadingDepartamentos } from "../../../store/Administracion/Departamentos/thunk";
import { startLoadingUsuarios } from "../../../store/Administracion/Usuarios/thunks";
import { handleSeleccion } from "../../../store/Administracion/Roles/rolSlice";
import { startLoadingFacultades } from "../../../store/Administracion/Roles/thunks";

export const Roles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingDepartamentos());
    dispatch(startLoadingUsuarios());
    dispatch(startLoadingFacultades())
  }, [dispatch]);
  useEffect(() => {
    handleSeleccion("Departamento");
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
