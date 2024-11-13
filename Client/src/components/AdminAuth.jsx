import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const AdminAuth = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.adminAuth.user);
  if (!user || user.nombre !== "admn") {
    return <Navigate to="/login" />;
  }
  return <Component {...rest} />;
};
