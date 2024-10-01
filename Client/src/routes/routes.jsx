import { AdministracionMain } from "../Administracion/AdministracionMain";
import { Categorizaciones } from "../Administracion/views/Categorizaciones/Categorizaciones";
import { EditarCategoria } from "../Administracion/views/Categorizaciones/components/EditarCategoria";
import { Loges } from "../Administracion/views/Loges/Loges";
import { Permisos } from "../Administracion/views/Permisos/Permisos";
import { CrearRol, Roles, VerRoles } from "../Administracion/views/Roles";

export const routes = [
  {
    path: "/admin",
    element: <AdministracionMain />,
    children: [
      {
        path: "categorizaciones",
        element: <Categorizaciones />,
      },
      {
        path: "categorizaciones/:categoria/editar",  
        element: <EditarCategoria />, 
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
