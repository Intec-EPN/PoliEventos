const RolesModel = require("../models/rolesModel");
const { obtenerDepartamentosArray } = require("./departamentosController");
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
            attributes: ['id', 'nombre', 'descripcion']
        });
        const niveles = await obtenerNivelesArray(); // Obtengo los niveels para comparar luego.

        const roles = await Promise.all(
            rolesIniciales.map(async (rol) => {
                // Obtener los departamentos
                const departamentos = await obtenerDepartamentosArray(rol.id)
                const acciones = await obtenerPermisosRol(rol.id)
                // Agrupo las acciones por nivel_id (obtengo nivel de permisos)
                const permisos = niveles.map(nivel => {
                    // Filtro por el id del nivel
                    const accionesFiltradas = acciones.filter( acc => acc.nivel_id === nivel.id);
                    // Retorno mi nuevo objeto con lo necesario del nivel y las acciones correspondientes.
                    if(accionesFiltradas.length>0){
                        return {
                            nombre: nivel.nombre, 
                            color: nivel.color,
                            acciones: accionesFiltradas.map(acc => acc.permiso_id)
                        }
                    };
                    return {
                        nombre: nivel.nombre, 
                        color: nivel.color,
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

module.exports = { obtenerRolDescripcionId, obtenerRolesDescripcion, obtenerRoles };