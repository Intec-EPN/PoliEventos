USE poli_eventos_db;

CREATE TABLE Esquemas_Categorizacion (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    visible BOOLEAN NOT NULL
);

select * from Categorias;
CREATE TABLE Categorias (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    visible BOOLEAN NOT NULL,
    esquema_id BIGINT UNSIGNED,
    FOREIGN KEY (esquema_id) REFERENCES Esquemas_Categorizacion(id)
);

select * from Categorias;