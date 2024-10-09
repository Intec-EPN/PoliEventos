USE poli_eventos_db;


-- Obtener los departamentos por id
DELIMITER $$
CREATE PROCEDURE Get_Departamentos_Rol_Id(IN in_rol_id BIGINT UNSIGNED)
BEGIN
    SELECT d.nombre AS departamento
    FROM Rol_Departamentos rd
    JOIN Departamentos d ON rd.departamento_id = d.id
    WHERE rd.rol_id = in_rol_id;
END $$
DELIMITER ;

-- Llamar a los departamentos de un rol en específico
CALL Get_Departamentos_Rol_Id(2);



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




