use poli_eventos_db;

DELIMITER //
CREATE PROCEDURE EliminarUsuarioPorID(IN usuarioID CHAR(36))
BEGIN
    DELETE FROM Usuarios WHERE id = usuarioID;
END //
DELIMITER ;


call EliminarUsuarioPorID('420a12f4-b3bc-4be6-9109-359f1ee38683');

select * from Usuarios;