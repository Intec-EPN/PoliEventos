const { validationResult } = require('express-validator'); // Importa body y validationResult
const RolesModel = require("../../models/Roles/rolesModel");
const DepartamentosModel = require('../../models/Roles/departamentosModel');
const RolPermisosModel = require('../../models/Roles/tablas-intermedias/rol_permisosModel');
const { obtenerDepartamentosArray, obtenerDepartamentoId } = require("./departamentosController");
const { obtenerDeptFacultadId } = require("./facultadesController");
const { obtenerNivelesArray } = require("./nivelesController");
const { obtenerPermisosRol } = require("./permisosController");

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
        console.log(`Error al obtener rol con descripcion: ${error}`);
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
        // findAll para obtener todos
        const rolesIniciales = await RolesModel.findAll({
            attributes: ['id', 'nombre', 'descripcion', 'departamento_id', 'facultad_id']
        });
        const niveles = await obtenerNivelesArray(); // Obtengo los niveels para comparar luego.

        const roles = await Promise.all(
            rolesIniciales.map(async (rol) => {
                let departamentos;
                // Obtener los departamentos
                if (rol.departamento_id) {
                    // Si tengo id de departamento, lo incluyo.
                    departamentos = await obtenerDepartamentosArray(rol.id);
                } else {
                    // Si no tengo id, significa que es la facultad, incluyo los departamentos de la facultad:
                    departamentos = await obtenerDeptFacultadId(rol.facultad_id);
                }

                const acciones = await obtenerPermisosRol(rol.id)
                // Agrupo las acciones por nivel_id (obtengo nivel de permisos)
                const permisos = niveles.map(nivel => {
                    // Filtro por el id del nivel
                    const accionesFiltradas = acciones.filter(acc => acc.nivel_id === nivel.id);
                    // Retorno mi nuevo objeto con lo necesario del nivel y las acciones correspondientes.
                    if (accionesFiltradas.length > 0) {
                        return {
                            nombre: nivel.nombre,
                            color: nivel.color,
                            icono: nivel.icono,
                            acciones: accionesFiltradas.map(acc => acc.permiso_id)
                        }
                    };
                    return {
                        nombre: nivel.nombre,
                        color: nivel.color,
                        icono: nivel.icono,
                        acciones: []
                    }
                });

                return {
                    rol: rol.nombre,
                    descripcion: rol.descripcion,
                    departamentos: departamentos.map(dep => dep.departamento), // Solo me traigo el nombre
                    permisos: permisos
                };
            })
        );
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



module.exports = { obtenerRolDescripcionId, obtenerRolesDescripcion, obtenerRoles, crearRol };