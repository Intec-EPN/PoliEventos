import { useSelector } from "react-redux";
import { PermisoInfoCard } from "./PermisoInfoCard";

export const PermisosInfo = () => {
  const { permisosAcciones, acciones } = useSelector((state) => state.permiso);
  console.log("permisosAcciones:", permisosAcciones);
  console.log("acciones:", acciones);

  return (
    {

    }
    // <PermisoInfoCard />
  );
};
