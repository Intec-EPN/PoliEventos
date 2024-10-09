USE poli_eventos_db;

-- Agregar departamentos
INSERT INTO Departamentos (nombre) VALUES 
('DETRI'), 
('DACI'),
('DEE');
-- Insertar roles
INSERT INTO Roles (nombre, descripcion) VALUES 
('Rol1', 'Primer rol con acceso al DETRI y DACI'),
('Rol2', 'Segundo rol con acceso solo al DACI'),
('Rol3', 'Tercer rol con acceso solo al DEE');

-- Asignar departamentos a los roles
INSERT INTO Rol_Departamentos (rol_id, departamento_id) VALUES 
(1, 1), 
(1, 2),
(2, 2),
(3, 3);

-- Insertar niveles
INSERT INTO Niveles (nombre, color) VALUES 
('Propio','primary'), 
('Departamento','#c44b00'), 
('Facultad','#bd0000');

-- Insertar permisos con sus niveles
INSERT INTO Permisos (accion, tooltip, bgColor, nivel_id) VALUES
('Gestionar evento', 'Crear, editar, eliminar y descargar información privada de un elemento propio.', '#d4e1f2', 1),  -- Nivel propio
('Editar evento', 'Editar evento que pertenezca al departamento.', '#f2e6b2', 2),  -- Nivel departamento
('Eliminar evento', 'Eliminar evento que pertenezca al departamento', '#f2d89f', 2),  -- Nivel departamento
('Generar reporte', 'Generar reporte de cualquier evento en el departamento.', '#f1ce81', 2),  -- Nivel departamento
('Descargar privada', 'Descargar información privada de evento de departamento.', '#f2b873', 2),  -- Nivel departamento
('Editar evento', 'Editar evento que pertenezca al facultad.', '#f2c9c9', 3),  -- Nivel facultad
('Eliminar evento', 'Eliminar evento que pertenezca al facultad', '#f2a1a1', 3),  -- Nivel facultad
('Generar reporte', 'Generar reporte de cualquier evento en el facultad.', '#f28585', 3),  -- Nivel facultad
('Descargar privada', 'Descargar información privada de evento de facultad.', '#f57171', 3);  -- Nivel facultad


-- ROLES DE EJEMPLO:
-- Asignar permisos al Rol 1
INSERT INTO Rol_Permisos (rol_id, permiso_id) VALUES
(1, 1),  -- Gestionar evento (Propio)
(1, 2),  -- Editar evento (Departamento)
(1, 3);  -- Eliminar evento (Departamento)

-- Asignar permisos al Rol 2
INSERT INTO Rol_Permisos (rol_id, permiso_id) VALUES
(2, 1),  -- Gestionar evento (Propio)
(2, 2),  -- Editar evento (Departamento)
(2, 7),  -- Eliminar evento (Facultad)
(2, 6);  -- Editar evento (Facultad)

-- Asignar permisos al Rol 3
INSERT INTO Rol_Permisos (rol_id, permiso_id) VALUES
(3, 1),  -- Gestionar evento (Propio)
(3, 2),  -- Editar evento (Departamento)
(3, 4),  -- Generar reporte (Departamento)
(3, 5),  -- Descargar privada (Departamento)
(3, 6),  -- Editar evento (Facultad)
(3, 8),  -- Generar reporte (Facultad)
(3, 9);  -- Descargar privada (Facultad)


