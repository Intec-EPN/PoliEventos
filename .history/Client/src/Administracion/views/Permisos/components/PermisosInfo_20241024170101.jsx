import { useSelector } from "react-redux";

export const PermisosInfo = () => {
  const {permisosAcciones, acciones} = useSelector((state) => state.permiso);
  console.log(permisosAcciones, acciones);
  
  return <div>PermisosInfo</div>;
};
