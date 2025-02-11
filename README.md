# PoliEventos
Puede probar la app directamente en [PoliEventos](https://poli-eventos-test.netlify.app/). Tome en cuenta que al utilizar servicios gratuitos, la primera conexión al servidor tomará más tiempo de lo habitual.
## Índice

- [PoliEventos](#polieventos)
  - [Índice](#índice)
  - [Introducción](#introducción)
  - [Ejecución](#ejecución)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Nota](#nota)
  - [Despliegue](#despliegue)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
    - [Base de Datos](#base-de-datos)
  - [API](#api)
    - [Autenticación](#autenticación)
      - [Crear Usuario](#crear-usuario)
      - [Iniciar Sesión](#iniciar-sesión)
      - [Cerrar Sesión](#cerrar-sesión)
    - [Roles](#roles)
      - [Obtener Roles](#obtener-roles)
      - [Obtener Rol por ID](#obtener-rol-por-id)
      - [Crear Rol](#crear-rol)
      - [Eliminar Rol](#eliminar-rol)
    - [Niveles](#niveles)
      - [Obtener Niveles Base](#obtener-niveles-base)
    - [Permisos](#permisos)
      - [Obtener Permisos Base](#obtener-permisos-base)
      - [Obtener Permisos Acciones](#obtener-permisos-acciones)
      - [Obtener Estructura](#obtener-estructura)
      - [Obtener Permisos por Rol](#obtener-permisos-por-rol)
    - [Departamentos](#departamentos)
      - [Obtener Departamentos](#obtener-departamentos)
      - [Obtener Departamento por Rol ID](#obtener-departamento-por-rol-id)
      - [Obtener Departamentos por ID](#obtener-departamentos-por-id)
    - [Facultades](#facultades)
      - [Obtener Facultades](#obtener-facultades)
      - [Obtener Departamentos por Facultad ID](#obtener-departamentos-por-facultad-id)
    - [Esquemas](#esquemas)
      - [Obtener Esquemas y Categorías](#obtener-esquemas-y-categorías)
      - [Crear Esquema](#crear-esquema)
      - [Actualizar Esquema](#actualizar-esquema)
      - [Cambiar Visibilidad de Esquema](#cambiar-visibilidad-de-esquema)
      - [Cambiar Visibilidad de Categoría](#cambiar-visibilidad-de-categoría)
      - [Eliminar Esquema](#eliminar-esquema)
      - [Eliminar Categoría](#eliminar-categoría)
    - [Usuarios](#usuarios)
      - [Obtener Usuarios](#obtener-usuarios)
      - [Asignar Roles a Usuario](#asignar-roles-a-usuario)
      - [Eliminar Usuario](#eliminar-usuario)
      - [Editar Usuario](#editar-usuario)
      - [Cambiar Habilitación de Usuario](#cambiar-habilitación-de-usuario)
    - [Eventos](#eventos)
      - [Crear Evento](#crear-evento)
      - [Obtener Eventos](#obtener-eventos)
      - [Eliminar Evento](#eliminar-evento)
      - [Editar Evento](#editar-evento)
      - [Agregar Asistentes](#agregar-asistentes)
      - [Agregar Estudiantes](#agregar-estudiantes)
    - [Archivos](#archivos)
      - [Subir Archivos](#subir-archivos)
      - [Editar Nombre de Archivo](#editar-nombre-de-archivo)
      - [Eliminar Archivo](#eliminar-archivo)
      - [Eliminar Archivos](#eliminar-archivos)
      - [Obtener Archivos por Evento](#obtener-archivos-por-evento)
      - [Descargar Archivo](#descargar-archivo)
      - [Descargar Archivos ZIP](#descargar-archivos-zip)
      - [Editar Nombres de Archivos por Evento](#editar-nombres-de-archivos-por-evento)
  - [Uso](#uso)
    - [Módulo de Administración:](#módulo-de-administración)
    - [Módulo de Gestión de Eventos:](#módulo-de-gestión-de-eventos)
    - [Módulo de Reportes:](#módulo-de-reportes)
  - [Créditos](#créditos)

## Introducción
Este proyecto es una herramienta diseñada para la gestión de eventos de vinculación en la Facultad de Ingeniería Eléctrica y Electrónica (FIEE) de la Escuela Politécnica Nacional (EPN). La aplicación facilita el registro, visualización y administración de eventos realizados en la facultad, integrando funcionalidades como manejo de roles y permisos, creación de reportes y categorización de eventos.

El sistema implementa una arquitectura híbrida basada en el patrón MVC y el enfoque SPA (Single Page Application), utilizando tecnologías modernas como React, Express, y MySQL. Esto garantiza una experiencia de usuario fluida y eficiente.

![intro](/Media/intro.png)

En el resto del README, se detallarán las instrucciones para la ejecución y despliegue del proyecto, la documentación de la API, y otros aspectos importantes como el uso y los créditos del proyecto.

[Volver al índice](#índice)

## Ejecución
Para ejecutar el proyecto en desarrollo, asegúrate de tener los directorios `/Server` y `/Client` en el root del proyecto.

### Backend
1. Accede al directorio `/Server`.
2. Ejecuta el siguiente comando para iniciar el servidor:
   ```bash
   node server.js
   ```

### Frontend
1. Accede al directorio `/Client`.
2. Ejecuta el siguiente comando para iniciar el cliente:
   ```bash
   npm run dev
   ```

### Nota
Para que el frontend se conecte correctamente al backend, asegúrate de que el archivo `axiosConfig.js` en el frontend esté configurado con el dominio correcto del backend. Aquí tienes un ejemplo de configuración para un entorno local:

```javascript
// filepath: /c:/Users/User/Desktop/TIC/Client/src/api/axiosConfig.js
import axios from 'axios';

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api" // URL del backend en local
});

// ...existing code...
```

[Volver al índice](#índice)

## Despliegue
El prototipo final de esta aplicación se ha desplegado utilizando Netlify, Render y Clever Cloud, el resultado se lo puede observar en el siguiente enlace: [PoliEventos](https://poli-eventos-test.netlify.app/)

A continuación, se puede observar una recomendación para desplegar cada parte:
### Frontend
Para desplegar el frontend, se puede utilizar Netlify:

1. Accede al directorio `/Client`.
2. Ejecuta el comando para construir el proyecto:
   ```bash
   npm run build
   ```
3. Esto generará una carpeta `dist` con los archivos estáticos.
4. Se sube la carpeta `dist` a Netlify y en caso de tener dominio, se lo configura según las necesidades.

### Backend
Para desplegar el backend, se puede utilizar Render:

1. Sube el directorio `/Server` a Render.
2. Configura las siguientes variables de entorno necesarias:
    1. DB_NAME
    2. DB_USER
    3. DB_PASSWORD
    1. DB_HOST
    2. DB_PORT
    3. PORT
    4. NODE_ENV
    5. JWT_SECRET
    6. USERADMIN
    7. USEREMAIL
    8. USERPASS
3. Render se encargará de ejecutar el servidor automáticamente.

NODE_ENV deberá ser production si es que se está desplegando en ese entorno, el puerto el escogido para el despliegue y JWT_SECRET una clave que puede ser generada en [JwtSecret](https://jwtsecret.com/generate).

En cuanto a las credenciales de USERADMIN, USEREMAIL y USERPASS serán todas las correspondientes al usuario de administrador. 

### Base de Datos
Para la base de datos, se puedes utilizar Clever Cloud:

1. Crea una base de datos en Clever Cloud y obtén las credenciales de conexión.
2. Configura las variables de entorno en Render con las credenciales de la base de datos.
3. Al ejecutar el backend, Sequelize se encargará de crear todas las tablas y relaciones automáticamente.
4. Ejecuta los procedimientos almacenados que se encuentran en el archivo `procedures.sql` para completar la configuración de la base de datos.

[Volver al índice](#índice)

## API
Instrucciones sobre cómo usar tu proyecto.

[Volver al índice](#índice)

### Autenticación

#### Crear Usuario

```http
  POST /api/auth/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre`  | `string` | **Required**. Nombre del usuario |
| `email`   | `string` | **Required**. Correo del usuario |
| `password`| `string` | **Required**. Contraseña del usuario |

[Volver a API](#api)

#### Iniciar Sesión

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. Correo del usuario |
| `password`| `string` | **Required**. Contraseña del usuario |

[Volver a API](#api)

#### Cerrar Sesión

```http
  POST /api/auth/logout
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

### Roles

#### Obtener Roles

```http
  GET /api/admin/roles
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Obtener Rol por ID

```http
  GET /api/admin/roles/get/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del rol a obtener |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Crear Rol

```http
  POST /api/admin/roles/create
```

| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `rol`         | `string` | **Required**. Nombre del rol      |
| `descripcion` | `string` | Descripción del rol               |
| `departamentos`| `array` | Lista de departamentos            |
| `permisos`    | `array`  | Lista de permisos                 |
| `facultad_id` | `number` | ID de la facultad                 |
| `token`       | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Eliminar Rol

```http
  DELETE /api/admin/roles/${nombre}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nombre`  | `string` | **Required**. Nombre del rol a eliminar |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

### Niveles

#### Obtener Niveles Base

```http
  GET /api/admin/niveles/getbase
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

### Permisos

#### Obtener Permisos Base

```http
  GET /api/admin/permisos/getbase
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Obtener Permisos Acciones

```http
  GET /api/admin/permisos/get
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Obtener Estructura

```http
  GET /api/admin/permisos/estructura
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Obtener Permisos por Rol

```http
  GET /api/gestion/permisos/${rolId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `rolId`   | `string` | **Required**. Id del rol a obtener permisos |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

### Departamentos

#### Obtener Departamentos

```http
  GET /api/admin/departamentos
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Obtener Departamento por Rol ID

```http
  GET /api/admin/departamentos/get/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del rol a obtener |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Obtener Departamentos por ID

```http
  GET /api/gestion/departamentos
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

### Facultades

#### Obtener Facultades

```http
  GET /api/admin/facultades
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Obtener Departamentos por Facultad ID

```http
  GET /api/admin/facultades/getdept/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id de la facultad a obtener |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

### Esquemas

#### Obtener Esquemas y Categorías

```http
  GET /api/admin/esquemas/get
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Crear Esquema

```http
  POST /api/admin/esquemas
```

| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `nombre`      | `string` | **Required**. Nombre del esquema  |
| `descripcion` | `string` | Descripción del esquema           |
| `visible`     | `boolean`| Visibilidad del esquema           |
| `token`       | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Actualizar Esquema

```http
  PUT /api/admin/esquemas/${id}
```

| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `id`          | `string` | **Required**. Id del esquema      |
| `nombre`      | `string` | **Required**. Nombre del esquema  |
| `descripcion` | `string` | Descripción del esquema           |
| `visible`     | `boolean`| Visibilidad del esquema           |
| `categorias`  | `array`  | Lista de categorías               |
| `token`       | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Cambiar Visibilidad de Esquema

```http
  PUT /api/admin/esquemas/visibilidad/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del esquema      |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Cambiar Visibilidad de Categoría

```http
  PUT /api/admin/esquemas/categoria/visibilidad/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id de la categoría  |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Eliminar Esquema

```http
  DELETE /api/admin/esquemas/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del esquema      |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Eliminar Categoría

```http
  DELETE /api/admin/esquemas/categoria/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id de la categoría  |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

### Usuarios

#### Obtener Usuarios

```http
  GET /api/admin/usuarios/get
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Asignar Roles a Usuario

```http
  POST /api/admin/usuarios/asignar
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `usuarioId`| `string` | **Required**. Id del usuario      |
| `rolesIds` | `array`  | **Required**. Lista de ids de roles |
| `token`    | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Eliminar Usuario

```http
  DELETE /api/admin/usuarios/${usuarioId}
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `usuarioId`| `string` | **Required**. Id del usuario      |
| `token`    | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Editar Usuario

```http
  PATCH /api/admin/usuarios/${usuarioId}
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `usuarioId`| `string` | **Required**. Id del usuario      |
| `nombre`   | `string` | Nombre del usuario                |
| `correo`   | `string` | Correo del usuario                |
| `password` | `string` | Contraseña del usuario            |
| `token`    | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Cambiar Habilitación de Usuario

```http
  PATCH /api/admin/usuarios/habilitar/${usuarioId}
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `usuarioId`| `string` | **Required**. Id del usuario      |
| `token`    | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

### Eventos

#### Crear Evento

```http
  POST /api/gestion
```

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `usuarioId`     | `string` | **Required**. Id del usuario      |
| `eventoCreacion`| `object` | **Required**. Datos del evento    |
| `token`         | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Obtener Eventos

```http
  GET /api/gestion
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Eliminar Evento

```http
  DELETE /api/gestion/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del evento       |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Editar Evento

```http
  PUT /api/gestion/${id}
```

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `usuarioId`     | `string` | **Required**. Id del usuario      |
| `eventoEdicion` | `object` | **Required**. Datos del evento    |
| `token`         | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Agregar Asistentes

```http
  PATCH /api/gestion/asistentes/${eventoId}
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `eventoId` | `string` | **Required**. Id del evento       |
| `asistentes`| `array` | **Required**. Lista de asistentes |
| `token`    | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Agregar Estudiantes

```http
  PATCH /api/gestion/estudiantes/${eventoId}
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `eventoId` | `string` | **Required**. Id del evento       |
| `estudiantes`| `array`| **Required**. Lista de estudiantes|
| `token`    | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

### Archivos

#### Subir Archivos

```http
  POST /api/gestion/subir
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Editar Nombre de Archivo

```http
  PATCH /api/gestion/archivo/${nombreArchivo}
```

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `nombreArchivo` | `string` | **Required**. Nombre del archivo  |
| `nuevoDepartamento` | `string` | **Required**. Nuevo nombre del departamento |
| `token`         | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Eliminar Archivo

```http
  DELETE /api/gestion/archivo/${nombreArchivo}/${eventoId}
```

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `nombreArchivo` | `string` | **Required**. Nombre del archivo  |
| `eventoId`      | `string` | **Required**. Id del evento       |
| `token`         | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Eliminar Archivos

```http
  DELETE /api/gestion/archivo/${eventoId}
```

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `eventoId`      | `string` | **Required**. Id del evento       |
| `token`         | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Obtener Archivos por Evento

```http
  GET /api/gestion/archivos/${idEvento}
```

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `idEvento`      | `string` | **Required**. Id del evento       |
| `token`         | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Descargar Archivo

```http
  GET /api/gestion/archivos/descargar/${nombreArchivo}
```

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `nombreArchivo` | `string` | **Required**. Nombre del archivo  |
| `token`         | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Descargar Archivos ZIP

```http
  POST /api/gestion/descargar-zip
```

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `archivos`      | `array`  | **Required**. Lista de archivos   |
| `token`         | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

#### Editar Nombres de Archivos por Evento

```http
  PATCH /api/gestion/archivos/${eventoId}
```

| Parameter       | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `eventoId`      | `string` | **Required**. Id del evento       |
| `nuevoDepartamento` | `array` | **Required**. Lista de nuevos nombres de departamentos |
| `token`         | `string` | **Required**. Token de autenticación (en el header) |

[Volver a API](#api)

## Uso
El esquema de directorios del backend es el siguiente:
![esq_backend](/Media/UML%20Diagrams/out/EstructuraBackend/EstructuraBackend.png)
El esquema de directorios del frontend es el siguiente:
![esq_frontend](/Media/UML%20Diagrams/out/EstructuraFrontend/EstructuraFrontend.png)

Además, la herramienta está dividida en tres módulos principales:
### Módulo de Administración:
Gestiona usuarios, roles y permisos.
Administra esquemas de categorización para los eventos.
![administracion](/Media/administracion.png)

### Módulo de Gestión de Eventos:
Permite la creación, edición, visualización y eliminación de eventos.
Incluye vistas en formato calendario y lista.
![gestion](/Media/gestion.png)

### Módulo de Reportes:
Genera gráficos y reportes detallados sobre los eventos.
Permite la exportación de datos en formatos CSV o XLSX.
Para visualizar el flujo de uso, consulta las imágenes incluidas en este repositorio, que corresponden a las maquetas y capturas de la aplicación.
![reporte](/Media/reportes.png)


[Volver al índice](#índice)


## Créditos
Este proyecto fue desarrollado como trabajo de integración curricular por [Jonathan Puente](https://github.com/jona0707).

Posteriormente es mantenido, mejorado y escalado en el ThinQ Media Lab de la Escuela Politécnica Nacional.

[Volver al índice](#índice)