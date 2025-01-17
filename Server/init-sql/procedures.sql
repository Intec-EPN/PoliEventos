DROP PROCEDURE IF EXISTS ActualizarBgColorPorId;
DELIMITER $$
CREATE PROCEDURE ActualizarBgColorPorId(
    IN nuevoBgColor VARCHAR(7), 
    IN permisoId INT
)
BEGIN
    UPDATE permisos
    SET bgColor = nuevoBgColor
    WHERE id = permisoId;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS ActualizarColorPorId;
DELIMITER $$
CREATE PROCEDURE ActualizarColorPorId(
    IN nuevoColor VARCHAR(20), 
    IN nivelId INT
)
BEGIN
    UPDATE niveles
    SET color = nuevoColor
    WHERE id = nivelId;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS BorrarRol;
DELIMITER $$
CREATE PROCEDURE BorrarRol(
    IN rolId BIGINT UNSIGNED
)
BEGIN
    DELETE FROM roles
    WHERE id = rolId;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS EliminarCategoria;
DELIMITER $$
CREATE PROCEDURE EliminarCategoria(
    IN categoriaId BIGINT UNSIGNED
)
BEGIN
    DELETE FROM categorias
    WHERE id = categoriaId;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS EliminarEsquemaCategorizacion;
DELIMITER $$
CREATE PROCEDURE EliminarEsquemaCategorizacion(
    IN esquemaId BIGINT UNSIGNED
)
BEGIN
    DELETE FROM esquemas_categorizacion
    WHERE id = esquemaId;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS EliminarUsuarioPorID;
DELIMITER $$
CREATE PROCEDURE EliminarUsuarioPorID(
    IN usuarioID CHAR(36)
)
BEGIN
    DELETE FROM usuarios
    WHERE id = usuarioID;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS Get_Departamentos_Facultad_Id;
DELIMITER $$
CREATE PROCEDURE Get_Departamentos_Facultad_Id(
    IN facultadId BIGINT UNSIGNED
)
BEGIN
    SELECT d.nombre
    FROM departamentos d
    WHERE d.facultad_id = facultadId;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS Get_Departamentos_Rol_Id;
DELIMITER $$
CREATE PROCEDURE Get_Departamentos_Rol_Id(
    IN in_rol_id BIGINT UNSIGNED
)
BEGIN
    SELECT d.nombre AS departamento
    FROM roles r
    JOIN departamentos d ON r.departamento_id = d.id
    WHERE r.id = in_rol_id;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS Get_Permisos_Rol_Id;
DELIMITER $$
CREATE PROCEDURE Get_Permisos_Rol_Id(
    IN rol_id BIGINT UNSIGNED
)
BEGIN
    SELECT 
        p.id AS permiso_id,
        p.accion,
        p.tooltip,
        p.bgColor,
        n.id AS nivel_id
    FROM 
        rol_permisos pr
    JOIN 
        permisos p ON pr.permiso_id = p.id
    JOIN 
        niveles n ON p.nivel_id = n.id
    WHERE 
        pr.rol_id = rol_id;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS ObtenerNiveles;
DELIMITER $$
CREATE PROCEDURE ObtenerNiveles()
BEGIN
    SELECT * FROM niveles;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS ObtenerPermisos;
DELIMITER $$
CREATE PROCEDURE ObtenerPermisos()
BEGIN
    SELECT * FROM permisos;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS ObtenerRolesPorUsuarioId;
DELIMITER $$
CREATE PROCEDURE ObtenerRolesPorUsuarioId(
    IN p_usuario_id CHAR(36)
)
BEGIN
    SELECT 
        r.id AS rol_id,
        r.nombre AS rol_nombre,
        r.descripcion AS rol_descripcion,
        d.id AS departamento_id,
        f.id AS facultad_id
    FROM 
        usuario_rol ur
    JOIN 
        roles r ON ur.rol_id = r.id
    LEFT JOIN 
        departamentos d ON r.departamento_id = d.id
    LEFT JOIN 
        facultades f ON r.facultad_id = f.id
    WHERE 
        ur.usuario_id = p_usuario_id;
END$$
DELIMITER ;