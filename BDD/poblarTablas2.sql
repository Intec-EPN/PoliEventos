USE poli_eventos_db;

-- Agregar la Facultad de Ingeniería Eléctrica y Electrónica
INSERT INTO Facultades (nombre) VALUES 
('Facultad de Ingeniería Eléctrica y Electrónica');

-- Asociar los departamentos a la facultad recién creada
INSERT INTO Departamentos (nombre, facultad_id) VALUES 
('DETRI', 1), 
('DACI', 1),
('DEE', 1);


-- Insertar roles y asociarlos a la misma facultad
INSERT INTO Roles (nombre, descripcion, departamento_id, facultad_id) VALUES 
('Rol1', 'Primer rol con acceso al DETRI', 1, 1),
('Rol2', 'Segundo rol con acceso solo al DACI', 2, 1),
('Rol3', 'Tercer rol con acceso solo al DEE', 3, 1);

INSERT INTO Roles (nombre, descripcion, facultad_id) VALUES 
('Rol4', 'Rol con acceso a toda la Facultad de Ingeniería Eléctrica y Electrónica', 1);

-- Insertar niveles (sin cambios)
INSERT INTO Niveles (nombre, color) VALUES 
('Propio','primary'), 
('Departamento','#c44b00'), 
('Facultad','#bd0000');

-- Insertar permisos con sus niveles (sin cambios)
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

-- Asignar permisos de facultad al Rol4
INSERT INTO Rol_Permisos (rol_id, permiso_id) VALUES
(4, 6),  -- Editar evento (Facultad)
(4, 7),  -- Eliminar evento (Facultad)
(4, 8),  -- Generar reporte (Facultad)
(4, 9);  -- Descargar privada (Facultad)
