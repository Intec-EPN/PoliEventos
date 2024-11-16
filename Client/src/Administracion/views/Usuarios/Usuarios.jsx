import { Outlet } from "react-router-dom";
import { startLoadingUsuarios } from "../../../store/Administracion/Usuarios/thunks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Usuarios = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingUsuarios());
  }, [dispatch]);
  return (
    <>
      <Outlet />
    </>
  );
};
