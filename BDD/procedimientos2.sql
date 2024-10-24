USE poli_eventos_db;


-- Obtener los departamentos por id
DELIMITER $$
CREATE PROCEDURE Get_Departamentos_Rol_Id(IN in_rol_id BIGINT UNSIGNED)
BEGIN
    SELECT d.nombre AS departamento
    FROM Roles r
    JOIN Departamentos d ON r.departamento_id = d.id
    WHERE r.id = in_rol_id;
END $$
DELIMITER ;

-- Llamar a los departamentos de un rol en específico
CALL Get_Departamentos_Rol_Id(1);



DELIMITER $$
CREATE PROCEDURE Get_Permisos_Rol_Id(IN rol_id BIGINT UNSIGNED)
BEGIN
    SELECT 
        p.id AS permiso_id,  -- Agregamos el ID del permiso
        p.accion,
        p.tooltip,
        p.bgColor,
        n.id AS nivel_id  -- ID del nivel
    FROM 
        Rol_Permisos pr
    JOIN 
        Permisos p ON pr.permiso_id = p.id
    JOIN 
        Niveles n ON p.nivel_id = n.id
    WHERE 
        pr.rol_id = rol_id;
END $$
DELIMITER ;

-- Para llamar los permisos de un rol
CALL Get_Permisos_Rol_Id(3);


DELIMITER $$
CREATE PROCEDURE ObtenerPermisos()
BEGIN
    SELECT * FROM Permisos;
END $$
DELIMITER ;

call ObtenerPermisos();

DELIMITER $$
CREATE PROCEDURE ObtenerNiveles()
BEGIN
    SELECT * FROM Niveles;
END $$
DELIMITER ;

call ObtenerNiveles();


DELIMITER $$
CREATE PROCEDURE Get_Departamentos_Facultad_Id(IN facultadId BIGINT UNSIGNED)
BEGIN
  SELECT d.nombre
  FROM Departamentos d
  WHERE d.facultad_id = facultadId;
END $$
DELIMITER ;

call Get_Departamentos_Facultad_Id(1);


-- Actualizar colores:
DELIMITER $$
CREATE PROCEDURE ActualizarBgColorPorId(nuevoBgColor VARCHAR(7), permisoId INT)
BEGIN
    UPDATE Permisos
    SET bgColor = nuevoBgColor
    WHERE id = permisoId;
END $$
DELIMITER ;

-- Colores de chips
-- Propio
CALL ActualizarBgColorPorId('#23a5d9', 1);
-- Departamento
CALL ActualizarBgColorPorId('#b030ff', 2);
CALL ActualizarBgColorPorId('#a330ff', 3);
CALL ActualizarBgColorPorId('#9631ff', 4);
CALL ActualizarBgColorPorId('#7E23D9', 5);

-- Facultad
CALL ActualizarBgColorPorId('#4da93a', 6);
CALL ActualizarBgColorPorId('#248d18', 7);
CALL ActualizarBgColorPorId('#017b00', 8);
CALL ActualizarBgColorPorId('#006f00', 9);





-- Colores de texto
DELIMITER $$
CREATE PROCEDURE ActualizarColorPorId(nuevoColor VARCHAR(20), nivelId INT)
BEGIN
    UPDATE Niveles
    SET color = nuevoColor
    WHERE id = nivelId;
END $$
DELIMITER ;
-- Color de letra
-- Propio
CALL ActualizarColorPorId('#FFF', 1);
-- Departamento
CALL ActualizarColorPorId('#FFF', 2);
-- Facultad
CALL ActualizarColorPorId('#FFF', 3);
