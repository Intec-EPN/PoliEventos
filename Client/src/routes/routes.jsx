import { AdministracionMain } from "../Administracion/AdministracionMain";
import { Categorizaciones } from "../Administracion/views/Categorizaciones/Categorizaciones";
import { CrearEsquema } from "../Administracion/views/Categorizaciones/components/tipos/CrearEsquema";
import { EditarCategorias } from "../Administracion/views/Categorizaciones/components/tipos/EditarCategorias";
import { Loges } from "../Administracion/views/Loges/Loges";
import { Permisos } from "../Administracion/views/Permisos/Permisos";
import { CrearRol, Roles, VerRoles } from "../Administracion/views/Roles";
import { LoginMain } from "../Login/LoginMain";

export const routes = [
  {
    path: "/",
    element: <LoginMain />, 
  },
  {
    path: "/admin",
    element: <AdministracionMain />,
    children: [
      {
        path: "categorizaciones",
        element: <Categorizaciones />,
      },
      {
        path: "categorizaciones/:esquemaActual/editar",  
        element: <EditarCategorias />, 
      },
      {
        path: "categorizaciones/:esquemaActual/crear",  
        element: <CrearEsquema />, 
      },
      {
        path: "roles",
        element: <Roles />,
        children:[
          {
            path: "lista",
            element: <VerRoles />,
          },
          {
            path: "crear",
            element: <CrearRol />,
          },
        ]
      },
      {
        path: "permisos",
        element: <Permisos />,
      },
      {
        path: "logs",
        element: <Loges />,
      },
    ],
  },

];
