import { useSelector } from "react-redux";

export const PermisosInfo = () => {
  const {permisosAcciones, acciones} = useSelector((state) => state.permiso);
  return <div>PermisosInfo</div>;
};
