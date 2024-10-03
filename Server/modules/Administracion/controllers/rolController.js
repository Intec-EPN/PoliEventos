const Rol = require('../models/rolModel');
const RolDepartamento = require('../models/tablas-intermedias/rolDepartamento');
const RolPermiso = require('../models/tablas-intermedias/rolPermisosModel');
const Permiso = require('../models/permisoModel');
const Accion = require('../models/accionModel');
const Departamento = require('../models/departamentoModel');


exports.getRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll({
            include: [
                {
                    model: RolDepartamento,
                    include: [
                        {
                            model: Departamento,
                            attributes: ['nombre'],
                        }
                    ]
                },
                {
                    model: RolPermiso,
                    include: [
                        {
                            model: Permiso,
                            attributes: ['nombre', 'color'],
                            include: [
                                {
                                    model: Accion,
                                    through: { attributes: [] }, // Para omitir atributos de la tabla intermedia
                                    attributes: ['id'] // Solo obtenemos el ID de las acciones
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        const result = roles.map(rol => {
            const departamentos = rol.rolDepartamentos.map(rd => rd.departamento.nombre);
            const permisos = {};

            rol.rolPermisos.forEach(rp => {
                const permisoNombre = rp.permiso.nombre;
                permisos[permisoNombre] = {
                    nombre: rp.permiso.nombre,
                    color: rp.permiso.color,
                    acciones: rp.permiso.accions.map(a => a.id) // Solo tomamos los IDs de las acciones
                };
            });

            return {
                id: rol.id,
                rol: rol.rol, // Asumiendo que el campo en tu modelo se llama `rol`
                descripcion: rol.descripcion, // Asumiendo que el campo en tu modelo se llama `descripcion`
                departamentos: departamentos,
                permisos: permisos
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

