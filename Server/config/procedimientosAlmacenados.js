const { sequelize } = require('./db');

const crearProcedimientosAlmacenados = async () => {
    const procedimientos = [
        {
            nombre: 'ActualizarBgColorPorId',
            sql: `
            CREATE PROCEDURE ActualizarBgColorPorId(nuevoBgColor VARCHAR(7), permisoId INT)
            BEGIN
                UPDATE Permisos
                SET bgColor = nuevoBgColor
                WHERE id = permisoId;
            END;
            `
        },
        {
            nombre: 'ActualizarColorPorId',
            sql: `
            CREATE PROCEDURE ActualizarColorPorId(nuevoColor VARCHAR(20), nivelId INT)
            BEGIN
                UPDATE Niveles
                SET color = nuevoColor
                WHERE id = nivelId;
            END;
            `
        },
        {
            nombre: 'BorrarRol',
            sql: `
            CREATE PROCEDURE BorrarRol(IN rolId BIGINT UNSIGNED)
            BEGIN
                DELETE FROM Roles
                WHERE id = rolId;
            END;
            `
        },
        {
            nombre: 'EliminarCategoria',
            sql: `
            CREATE PROCEDURE EliminarCategoria(IN categoriaId BIGINT UNSIGNED)
            BEGIN
                DELETE FROM Categorias WHERE id = categoriaId;
            END;
            `
        },
        {
            nombre: 'EliminarEsquemaCategorizacion',
            sql: `
            CREATE PROCEDURE EliminarEsquemaCategorizacion(IN esquemaId BIGINT UNSIGNED)
            BEGIN
                DELETE FROM Esquemas_Categorizacion WHERE id = esquemaId;
            END;
            `
        },
        {
            nombre: 'EliminarUsuarioPorID',
            sql: `
            CREATE PROCEDURE EliminarUsuarioPorID(IN usuarioID CHAR(36))
            BEGIN
                DELETE FROM Usuarios WHERE id = usuarioID;
            END;
            `
        },
        {
            nombre: 'Get_Departamentos_Facultad_Id',
            sql: `
            CREATE PROCEDURE Get_Departamentos_Facultad_Id(IN facultadId BIGINT UNSIGNED)
            BEGIN
                SELECT d.nombre
                FROM Departamentos d
                WHERE d.facultad_id = facultadId;
            END;
            `
        },
        {
            nombre: 'Get_Departamentos_Rol_Id',
            sql: `
            CREATE PROCEDURE Get_Departamentos_Rol_Id(IN in_rol_id BIGINT UNSIGNED)
            BEGIN
                SELECT d.nombre AS departamento
                FROM Roles r
                JOIN Departamentos d ON r.departamento_id = d.id
                WHERE r.id = in_rol_id;
            END;
            `
        },
        {
            nombre: 'Get_Permisos_Rol_Id',
            sql: `
            CREATE PROCEDURE Get_Permisos_Rol_Id(IN rol_id BIGINT UNSIGNED)
            BEGIN
                SELECT 
                    p.id AS permiso_id,
                    p.accion,
                    p.tooltip,
                    p.bgColor,
                    n.id AS nivel_id
                FROM 
                    Rol_Permisos pr
                JOIN 
                    Permisos p ON pr.permiso_id = p.id
                JOIN 
                    Niveles n ON p.nivel_id = n.id
                WHERE 
                    pr.rol_id = rol_id;
            END;
            `
        },
        {
            nombre: 'ObtenerNiveles',
            sql: `
            CREATE PROCEDURE ObtenerNiveles()
            BEGIN
                SELECT * FROM Niveles;
            END;
            `
        },
        {
            nombre: 'ObtenerPermisos',
            sql: `
            CREATE PROCEDURE ObtenerPermisos()
            BEGIN
                SELECT * FROM Permisos;
            END;
            `
        },
        {
            nombre: 'ObtenerRolesPorUsuarioId',
            sql: `
            CREATE PROCEDURE ObtenerRolesPorUsuarioId(IN p_usuario_id CHAR(36))
            BEGIN
                SELECT 
                    r.id AS rol_id,
                    r.nombre AS rol_nombre,
                    r.descripcion AS rol_descripcion,
                    d.id AS departamento_id,
                    f.id AS facultad_id
                FROM 
                    Usuario_Rol ur
                JOIN 
                    Roles r ON ur.rol_id = r.id
                LEFT JOIN 
                    Departamentos d ON r.departamento_id = d.id
                LEFT JOIN 
                    Facultades f ON r.facultad_id = f.id
                WHERE 
                    ur.usuario_id = p_usuario_id;
            END;
            `
        }
    ];

    for (const procedimiento of procedimientos) {
        try {
            const [results] = await sequelize.query(`
                SELECT COUNT(*)
                FROM information_schema.routines
                WHERE routine_schema = '${process.env.DB_NAME}'
                AND routine_name = '${procedimiento.nombre}'
                AND routine_type = 'PROCEDURE';
            `);

            if (results[0]['COUNT(*)'] === 0) {
                await sequelize.query(procedimiento.sql);
                console.log(`Procedimiento almacenado ${procedimiento.nombre} creado`);
            } else {
                console.log(`Procedimiento almacenado ${procedimiento.nombre} ya existe`);
            }
        } catch (error) {
            console.error(`Error al crear el procedimiento almacenado ${procedimiento.nombre}:`, error);
        }
    }
};

module.exports = crearProcedimientosAlmacenados;