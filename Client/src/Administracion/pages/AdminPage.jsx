import { AdminLayout } from "../layout/AdminLayout"
import { Outlet, useRoutes } from "react-router-dom";
import { adminRoutes } from "../routes/adminRoutes";


export const AdminPage = () => {
  const routes = useRoutes(adminRoutes);
  
  return (
    <AdminLayout>
        <Outlet/>
    </AdminLayout>
  )
}
