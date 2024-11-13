import { AdministracionMain } from "../Administracion/AdministracionMain";
import { Categorizaciones } from "../Administracion/views/Categorizaciones/Categorizaciones";
import { CrearEsquema } from "../Administracion/views/Categorizaciones/components/tipos/CrearEsquema";
import { EditarCategorias } from "../Administracion/views/Categorizaciones/components/tipos/EditarCategorias";
import { Loges } from "../Administracion/views/Loges/Loges";
import { Permisos } from "../Administracion/views/Permisos/Permisos";
import { CrearRol, Roles, VerRoles } from "../Administracion/views/Roles";
import { LoginMain } from "../Auth/LoginMain";
import { AdminAuth } from "../components/AdminAuth";

export const routes = [
  {
    path: "/login",
    element: <LoginMain />, 
  },
  {
    path: "/admin",
    element: <AdminAuth component={AdministracionMain} />,
    children: [
      {
        path: "categorizaciones",
        element: <AdminAuth component={Categorizaciones} />,
      },
      {
        path: "categorizaciones/:esquemaActual/editar",  
        element: <AdminAuth component={EditarCategorias} />, 
      },
      {
        path: "categorizaciones/:esquemaActual/crear",  
        element: <AdminAuth component={CrearEsquema} />,
      },
      {
        path: "roles",
        element: <AdminAuth component={Roles} />,
        children:[
          {
            path: "lista",
            element: <AdminAuth component={VerRoles} />,
          },
          {
            path: "crear",
            element: <AdminAuth component={CrearRol} />,
          },
        ]
      },
      {
        path: "permisos",
        element: <AdminAuth component={Permisos} />,
      },
      {
        path: "logs",
        element: <AdminAuth component={Loges} />,
      },
    ],
  },
];
