import { Categorizaciones } from "../views/Categorizaciones/Categorizaciones";
import { Dashboard } from "../views/Dashboard";
import { Logs } from "../views/Logs/Logs";
import { Permisos } from "../views/Permisos/Permisos";
import { Roles } from "../views/Roles/Roles";

export const adminRoutes = [
  {
    path:'/admin',
    element: <Dashboard />
  },
  {
    path:'admin/categorizaciones',
    element: <Categorizaciones />
  },
  {
    path:'admin/roles',
    element: <Roles />
  },
  {
    path:'admin/permisos',
    element: <Permisos />
  },
  {
    path:'admin/logs',
    element: <Logs />
  },
];
