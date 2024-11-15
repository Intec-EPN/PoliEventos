use poli_eventos_db;

-- Crear rol de administrador:
INSERT INTO Roles (nombre, descripcion, departamento_id, facultad_id)
VALUES ('Aux', 'Rol especial para el administrador', NULL, NULL);

-- Verificar el ID del rol
SELECT id FROM Roles WHERE nombre = 'Administrador';

-- Verificar el ID del usuario
SELECT id FROM Usuarios WHERE correo = 'admn@polieventos.epn.edu.ec';

-- Asignar los IDs a variables
SET @rol_id = (SELECT id FROM Roles WHERE nombre = 'Administrador');
SET @rol_aux = (SELECT id FROM Roles WHERE nombre = 'Aux');
SET @usuario_id = (SELECT id FROM Usuarios WHERE correo = 'admn@polieventos.epn.edu.ec');

-- Verificar que las variables no sean NULL
SELECT @rol_id, @usuario_id;

-- Crear la asociación
INSERT INTO Usuario_Rol (id, usuario_id, rol_id)
VALUES (UUID(), @usuario_id, @rol_id);


-- Crear la asociación
INSERT INTO Usuario_Rol (id, usuario_id, rol_id)
VALUES (UUID(), @usuario_id, @rol_aux);


select * from Usuario_Rol;



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

CALL ObtenerRolesPorUsuarioId('fd039fe5-273d-4c84-ade1-8ed03b08421d');

select * from Usuarios;