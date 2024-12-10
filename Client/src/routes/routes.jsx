import { AdministracionMain } from "../Administracion/AdministracionMain";
import { Categorizaciones } from "../Administracion/views/Categorizaciones/Categorizaciones";
import { CrearEsquema } from "../Administracion/views/Categorizaciones/components/tipos/CrearEsquema";
import { EditarCategorias } from "../Administracion/views/Categorizaciones/components/tipos/EditarCategorias";
import { Loges } from "../Administracion/views/Loges/Loges";
import { Permisos } from "../Administracion/views/Permisos/Permisos";
import { CrearRol, Roles, VerRoles } from "../Administracion/views/Roles";
import { AsignarRoles } from "../Administracion/views/Usuarios/Asignar/AsignarRoles";
import { CrearUsuarios } from "../Administracion/views/Usuarios/Crear/CrearUsuarios";
import { EditarUsuario } from "../Administracion/views/Usuarios/Lista/components/EditarUsuario";
import { ListaUsuarios } from "../Administracion/views/Usuarios/Lista/ListaUsuarios";
import { Usuarios } from "../Administracion/views/Usuarios/Usuarios";
import { LoginMain } from "../Auth/LoginMain";
import { AdminAuth } from "../components/AdminAuth";
import { RolesAuth } from "../components/RolesAuth";
import { Calendario } from "../GestionEventos/Calendario/Calendario";
import { DePrueba } from "../GestionEventos/components/DePrueba";

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
        children: [
          {
            path: "lista",
            element: <AdminAuth component={VerRoles} />,
          },
          {
            path: "crear",
            element: <AdminAuth component={CrearRol} />,
          },
        ],
      },
      {
        path: "usuarios",
        element: <AdminAuth component={Usuarios} />,
        children: [
          {
            path: "lista",
            element: <AdminAuth component={ListaUsuarios} />,
          },
          {
            path: "asignar",
            element: <AdminAuth component={AsignarRoles} />,
          },
          {
            path: "crear",
            element: <AdminAuth component={CrearUsuarios} />,
          },
        ],
      },
      {
        path: "usuarios/:usuarioId/editar",
        element: <AdminAuth component={EditarUsuario} />,
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
  {
    path: "/calendario",
    element: <RolesAuth component={Calendario} />,
  },
];
