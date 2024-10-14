USE poli_eventos_db;

-- Insertar en la tabla EsquemasCategorizacion
INSERT INTO Esquemas_Categorizacion (nombre, descripcion, visible)
VALUES ('CES', 'Tipos de eventos correspondientes al CES', TRUE),
       ('EPN', 'Tipos de eventos correspondientes al EPN', TRUE);

-- Insertar en la tabla Categorias para el esquema CES
INSERT INTO Categorias (nombre, visible, esquema_id)
VALUES ('Servicios a la sociedad que no generen beneficio económico', TRUE, 1),
       ('Divulgación, democratización y distribución de saber', TRUE, 1),
       ('Cursos de educación continua', TRUE, 1),
       ('Fomento/desarrollo de organización de la sociedad civil', TRUE, 1),
       ('Procesos de cooperación y desarrollo', TRUE, 1),
       ('Internacionalización de la comunidad universitaria', TRUE, 1),
       ('Desarrollo de proyectos de innovación', TRUE, 1),
       ('Asistencia técnica, servicios especializados', TRUE, 1);

-- Insertar en la tabla Categorias para el esquema EPN
INSERT INTO Categorias (nombre, visible, esquema_id)
VALUES ('Proyectos de vinculación (CF)', TRUE, 2),
       ('Proyectos de vinculación (SF)', TRUE, 2),
       ('Charlas', TRUE, 2),
       ('Casas abiertas', TRUE, 2),
       ('Exposición/Ferias', TRUE, 2),
       ('Asesoría técnica externa', TRUE, 2),
       ('Entrevistas en medios de comunicación', TRUE, 2),
       ('Evento en redes sociales', TRUE, 2),
       ('Cursos de educación continua', TRUE, 2);
