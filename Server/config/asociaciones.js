const Accion = require("../modules/Administracion/models/accionModel");
const Departamento = require("../modules/Administracion/models/departamentoModel");
const Permiso = require("../modules/Administracion/models/permisoModel");
const Rol = require("../modules/Administracion/models/rolModel");
const PermisoAccion = require("../modules/Administracion/models/tablas-intermedias/permisoAccionModel");
const RolDepartamento = require("../modules/Administracion/models/tablas-intermedias/rolDepartamento");
const RolPermiso = require("../modules/Administracion/models/tablas-intermedias/rolPermisosModel");

// Definir asociaciones
const definirAsociaciones = () => {
    // Relación entre roles y permisos (muchos a muchos)
    Rol.belongsToMany(Permiso, { through: RolPermiso });
    Permiso.belongsToMany(Rol, { through: RolPermiso });

    // Relación entre permisos y acciones (muchos a muchos)
    Permiso.belongsToMany(Accion, { through: PermisoAccion });
    Accion.belongsToMany(Permiso, { through: PermisoAccion });

    // Relación entre roles y departamentos (muchos a muchos)
    Rol.belongsToMany(Departamento, { through: RolDepartamento });
    Departamento.belongsToMany(Rol, { through: RolDepartamento });
};

module.exports = definirAsociaciones;