import { AdminLayout } from "../layout/AdminLayout"
import { Outlet, useRoutes } from "react-router-dom";


export const AdminPage = () => {
  return (
    <AdminLayout>
        <Outlet/>
    </AdminLayout>
  )
}
