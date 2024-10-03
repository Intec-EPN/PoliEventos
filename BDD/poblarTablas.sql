use poli_eventos_db;

/* Rellenar permisos por defecto. */
INSERT INTO acciones (accion, tooltip, bgColor) VALUES
('Gestionar evento', 'Crear, editar, eliminar y descargar información privada de un elemento propio.', '#d4e1f2'),
('Editar evento', 'Editar evento que pertenezca al departamento.', '#f2e6b2'),
('Eliminar evento', 'Eliminar evento que pertenezca al departamento', '#f2d89f'),
('Generar reporte', 'Generar reporte de cualquier evento en el departamento.', '#f1ce81'),
('Descargar privada', 'Descargar información privada de evento de departamento.', '#f2b873'),
('Editar evento', 'Editar evento que pertenezca al facultad.', '#f2c9c9'),
('Eliminar evento', 'Eliminar evento que pertenezca al facultad', '#f2a1a1'),
('Generar reporte', 'Generar reporte de cualquier evento en el facultad.', '#f28585'),
('Descargar privada', 'Descargar información privada de evento de facultad.', '#f57171');

/* Rellenar los permisos por defecto */
INSERT INTO permisos (nombre, color) VALUES
    ('Propio', 'primary'),
    ('Departamento', '#c44b00'),
    ('Facultad', '#bd0000');

/*Insercion de roles de ejemplo*/
INSERT INTO roles (rol, descripcion) VALUES
    ('Rol 1', 'Descripción del rol 1.'),
    ('Rol 2', 'Descripción del rol 2.'),
    ('Rol 3', 'Descripción del rol 3.');
    
-- Departamentos
INSERT INTO departamentos (nombre) VALUES
	('DACI'),  -- Departamento de Ciencias de la Computación
	('DEE'),   -- Departamento de Electrónica y Electricidad
	('DETRI'); -- Departamento de Tecnología de la Información


/*Asociación de permisos a roles*/
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
    (1, 1),  -- Rol 1 tiene permiso 'Propio'
    (1, 2),  -- Rol 1 tiene permiso 'Departamento'
    (1, 3),  -- Rol 1 tiene permiso 'Facultad'
    (2, 2),  -- Rol 2 tiene permiso 'Departamento'
    (2, 3),  -- Rol 2 tiene permiso 'Facultad'
    (3, 1),  -- Rol 3 tiene permiso 'Propio'
    (3, 2);  -- Rol 3 tiene permiso 'Departamento'
    
    /*Asociación de acciones a permisos*/
    INSERT INTO permiso_acciones (permiso_id, accion_id) VALUES
    (1, 1),  -- Permiso 'Propio' tiene acción 'Gestionar evento'
    (2, 2),  -- Permiso 'Departamento' tiene acción 'Editar evento'
    (2, 3),  -- Permiso 'Departamento' tiene acción 'Eliminar evento'
    (2, 4),  -- Permiso 'Departamento' tiene acción 'Generar reporte'
    (2, 5),  -- Permiso 'Departamento' tiene acción 'Descargar privada'
    (3, 6),  -- Permiso 'Facultad' tiene acción 'Editar evento'
    (3, 7),  -- Permiso 'Facultad' tiene acción 'Eliminar evento'
    (3, 8),  -- Permiso 'Facultad' tiene acción 'Generar reporte'
    (3, 9);  -- Permiso 'Facultad' tiene acción 'Descargar privada'

-- Asociar roles y departamentos
INSERT INTO rol_departamento (rol_id, departamento_id) VALUES
    (1, 1),  -- Rol 1 tiene acceso al Departamento DACI
    (1, 2),  -- Rol 1 tiene acceso al Departamento DEE
    (2, 2),  -- Rol 2 tiene acceso al Departamento DEE
    (3, 3);  -- Rol 3 tiene acceso al Departamento DETRI
