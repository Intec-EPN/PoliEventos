USE poli_eventos_db;

-- Agregar la Facultad de Ingeniería Eléctrica y Electrónica
INSERT INTO Facultades (nombre) VALUES 
('Facultad de Ingeniería Eléctrica y Electrónica');
SET SQL_SAFE_UPDATES = 0;
UPDATE Facultades
SET nombre = 'FIEE'
WHERE nombre = 'Facultad de Ingeniería Eléctrica y Electrónica';
SET SQL_SAFE_UPDATES = 1;

select * from Facultades;

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
-- Agregar Iconos a los niveles:
SET SQL_SAFE_UPDATES = 0;
UPDATE Niveles
SET icono = CASE
    WHEN nombre = 'Propio' THEN 'PersonIcon'
    WHEN nombre = 'Departamento' THEN 'ApartmentIcon'
    WHEN nombre = 'Facultad' THEN 'AccountBalanceIcon'
    ELSE NULL
END;
SET SQL_SAFE_UPDATES = 1;




-- Insertar permisos con sus niveles (sin cambios)
INSERT INTO Permisos (accion, tooltip, bgColor, nivel_id) VALUES
('Gestionar evento', 'Crear, editar, eliminar y descargar información privada de un elemento propio.', '#23a5d9', 1),  -- Nivel propio
('Editar evento', 'Editar evento que pertenezca al departamento.', '#b030ff', 2),  -- Nivel departamento
('Eliminar evento', 'Eliminar evento que pertenezca al departamento', '#a330ff', 2),  -- Nivel departamento
('Generar reporte', 'Generar reporte de cualquier evento en el departamento.', '#9631ff', 2),  -- Nivel departamento
('Descarga privada', 'Descargar información privada de evento de departamento.', '#7e23d9', 2),  -- Nivel departamento
('Editar evento', 'Editar evento que pertenezca al facultad.', '#4da93a', 3),  -- Nivel facultad
('Eliminar evento', 'Eliminar evento que pertenezca al facultad', '#248d18', 3),  -- Nivel facultad
('Generar reporte', 'Generar reporte de cualquier evento en el facultad.', '#017b00', 3),  -- Nivel facultad
('Descarga privada', 'Descargar información privada de evento de facultad.', '#006f00', 3);  -- Nivel facultad

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


select * from roles;