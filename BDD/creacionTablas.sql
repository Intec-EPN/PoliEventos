create database poli_eventos_db;
use poli_eventos_db;

/*Creación de tabla de acciones.*/
create table acciones(
	id INT AUTO_INCREMENT PRIMARY KEY,
    accion VARCHAR(255) NOT NULL,
    tooltip TEXT,
    bgColor VARCHAR(7) NOT NULL
);

/*Creación de tabla de permisos*/ 
CREATE TABLE permisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    color VARCHAR(20) NOT NULL
);
/*Creación de tabla de roles*/
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(100) NOT NULL,
    descripcion TEXT
);
/*Tabla de departamentos*/
CREATE TABLE departamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);
/*Crear tabla intermedia permios y acciones*/
CREATE TABLE permiso_acciones (
    permiso_id INT,
    accion_id INT,
    PRIMARY KEY (permiso_id, accion_id),
    FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE,
    FOREIGN KEY (accion_id) REFERENCES acciones(id) ON DELETE CASCADE
);
/*Creación de tabla intermedia entre permisos y roles*/
CREATE TABLE rol_permisos (
    rol_id INT,
    permiso_id INT,
    PRIMARY KEY (rol_id, permiso_id),
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE
);
/*Tabla intermedia entre departamentos y roles*/
CREATE TABLE rol_departamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol_id INT NOT NULL,
    departamento_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id) ON DELETE CASCADE
);

