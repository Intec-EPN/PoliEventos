import { AdministracionMain } from "../Administracion/AdministracionMain";
import { Categorizaciones } from "../Administracion/views/Categorizaciones/Categorizaciones";
import { Logs } from "../Administracion/views/Logs/Logs";
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
        element: <Logs />,
      },
    ],
  },
];
