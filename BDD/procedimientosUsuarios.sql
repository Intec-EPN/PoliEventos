use poli_eventos_db;

DELIMITER //
CREATE PROCEDURE EliminarUsuarioPorID(IN usuarioID CHAR(36))
BEGIN
    DELETE FROM Usuarios WHERE id = usuarioID;
END //
DELIMITER ;


call EliminarUsuarioPorID('420a12f4-b3bc-4be6-9109-359f1ee38683');


DELIMITER //
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
        Usuario_Rol ur
    JOIN 
        Roles r ON ur.rol_id = r.id
    LEFT JOIN 
        Departamentos d ON r.departamento_id = d.id
    LEFT JOIN 
        Facultades f ON r.facultad_id = f.id
    WHERE 
        ur.usuario_id = p_usuario_id;
END //
DELIMITER ;

CALL ObtenerRolesPorUsuarioId('b2d581cb-6be0-4598-891a-68a4edbfb4a8');

select * from Usuarios;