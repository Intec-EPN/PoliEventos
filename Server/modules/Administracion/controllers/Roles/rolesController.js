const { validationResult } = require('express-validator'); // Importa body y validationResult
const RolesModel = require("../../models/Roles/rolesModel");
const DepartamentosModel = require('../../models/Roles/departamentosModel');
const RolPermisosModel = require('../../models/Roles/tablas-intermedias/rol_permisosModel');
const { obtenerDepartamentosArray, obtenerDepartamentoId } = require("./departamentosController");
const { obtenerDeptFacultadId } = require("./facultadesController");
const { obtenerNivelesArray } = require("./nivelesController");
const { obtenerPermisosRol } = require("./permisosController");
const { sequelize } = require('../../../../config/db');
const FacultadesModel = require('../../models/Roles/facultadesModel');

const obtenerRolDescripcionId = async (req, res) => {
    const rolId = req.params.id; // Obtengo el id desde los params.
    try {
        // findOne apra buscar el rol por ID
        const rol = await RolesModel.findOne({
            where: { id: rolId },  // Filtro para obtener el id
            attributes: ['nombre', 'descripcion']
        });

        // Verifico si se recogió algo:
        if (rol) {
            res.status(200).json(rol);
        } else {
            res.status(500).json({ error: 'Rol no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener rol con descripcion.' });
    }
};

const obtenerRolesDescripcion = async (req, res) => {
    try {
        // findAll para obtener todos
        const roles = await RolesModel.findAll({
            attributes: ['id', 'nombre', 'descripcion']
        });
        // Verifico si se recogió algo:
        if (roles) {
            res.status(200).json(roles);
        } else {
            res.status(500).json({ error: 'No existen roles.' });
        }
    } catch (error) {
        console.error(`Error al obtener los roles: ${error}`);
        res.status(500).json({ error: 'Error al obtener los roles.' });
    }
};


const obtenerRoles = async (req, res) => {
    try {
        const rolesIniciales = await RolesModel.findAll({
            attributes: ['id', 'nombre', 'descripcion', 'departamento_id', 'facultad_id']
        });
        const niveles = await obtenerNivelesArray();

        const roles = [];
        for (const rol of rolesIniciales) {
            let departamentos;
            let facultad = null;
            if (rol.facultad_id) {
                const facultadInfo = await FacultadesModel.findByPk(rol.facultad_id);
                facultad = facultadInfo ? facultadInfo.nombre : null;
            }

            let esFacultad = !rol.departamento_id;
            if (rol.departamento_id) {
                departamentos = await obtenerDepartamentosArray(rol.id);
            } else {
                departamentos = await obtenerDeptFacultadId(rol.facultad_id);
            }

            const acciones = await obtenerPermisosRol(rol.id);
            const permisos = niveles.map(nivel => {
                const accionesFiltradas = acciones.filter(acc => acc.nivel_id === nivel.id);
                if (accionesFiltradas.length > 0) {
                    return {
                        nombre: nivel.nombre,
                        color: nivel.color,
                        icono: nivel.icono,
                        acciones: accionesFiltradas.map(acc => acc.permiso_id)
                    };
                }
                return {
                    nombre: nivel.nombre,
                    color: nivel.color,
                    icono: nivel.icono,
                    acciones: []
                };
            });

            roles.push({
                id: rol.id,
                rol: rol.nombre,
                descripcion: rol.descripcion,
                departamentos: departamentos.map(dep => dep.departamento),
                permisos: permisos,
                facultad: facultad,
                esFacultad: esFacultad
            });
        }
        res.status(200).json(roles);
    } catch (error) {
        console.error(`Error al obtener los roles: ${error}`);
        res.status(500).json({ error: 'Error al obtener los roles.' });
    }
};


// Crear un rol
const crearRol = async (req, res) => {

    // Valido los errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rol, descripcion, departamentos, permisos, facultad_id } = req.body;
    try {
        // Verifico si el rol ya existe:
        const rolExistente = await RolesModel.findOne({ where: { nombre: rol } });
        if (rolExistente) {
            return res.status(400).json({ message: 'El rol ya existe.' });
        }

        // Guardo el rol en la tabla roles:
        const nuevoRol = await RolesModel.create({
            nombre: rol,
            descripcion: descripcion,
            // necesito solo guardar el id del departamento
            departamento_id: departamentos.length < 2 ? await obtenerDepartamentoId(departamentos[0]) : null,
            facultad_id: facultad_id

        });
        // Guardo en Rol_Permisos las referencias a permisos:
        if (permisos.length) {
            // Extraigo los ids de permisos
            const permisosIds = permisos.flatMap(p => p.acciones);
            const rolPermisos = permisosIds.map(permisoId => ({
                rol_id: nuevoRol.id,
                permiso_id: permisoId
            }));
            // Creo un rol permiso con lo que tengo en rolPermisos:
            await RolPermisosModel.bulkCreate(rolPermisos);
        }
        // Mensaje de confirmación
        res.status(201).json({ mensaje: 'Rol creado exitosamente', rol: nuevoRol });
    } catch (error) {
        console.error("Error al crear el rol:", error);
        return res.status(500).json({ message: "Error al crear el rol", error: error.message });
    }

};

const eliminarRolPorNombre = async (req, res) => {
    const nombre = req.params.nombre.trim(); // Trimear el nombre del rol
    // TODO VALIDAR QUE NO EXISTAN EVENTOS CON RELACIÓN A ALGUNA CATEGORÍA DE LOS USUARIOS
    try {
        // Verificamos si el rol existe antes de intentar eliminar
        const rolExistente = await RolesModel.findOne({ where: { nombre } });

        if (!rolExistente) {
            return res.status(404).json({ message: 'Rol no encontrado.' });
        }

        // Llamar al procedimiento almacenado para eliminar el rol (si es que existe).
        await sequelize.query("CALL BorrarRol(:rolNombre)", {
            replacements: { rolNombre: rolExistente.id }, // Pasamos el id del rol
        });

        // Si llegamos aquí, significa que la eliminación se realizó
        return res.status(200).json({ message: 'Rol eliminado correctamente.' });

    } catch (error) {
        console.error(`Error al eliminar el rol: ${error}`);
        res.status(500).json({ error: "Error al eliminar el rol." });
    }
};



module.exports = { obtenerRolDescripcionId, obtenerRolesDescripcion, obtenerRoles, crearRol, eliminarRolPorNombre };