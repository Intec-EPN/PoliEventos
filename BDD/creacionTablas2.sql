CREATE DATABASE poli_eventos_db;
USE poli_eventos_db;

-- Tabla de Departamentos
CREATE TABLE Departamentos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Cambiado a BIGINT UNSIGNED
  nombre VARCHAR(50) NOT NULL -- Nombre del departamento
);

-- Tabla de Roles
CREATE TABLE Roles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Cambiado a BIGINT UNSIGNED
  nombre VARCHAR(50),
  descripcion TEXT
);

-- Tabla de Rol_Departamentos (relación muchos a muchos entre Roles y Departamentos)
CREATE TABLE Rol_Departamentos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Cambiado a BIGINT UNSIGNED
  rol_id BIGINT UNSIGNED,  -- Cambiado a BIGINT UNSIGNED para ser compatible con Roles.id
  departamento_id BIGINT UNSIGNED,  -- Cambiado para hacer referencia a Departamentos
  FOREIGN KEY (rol_id) REFERENCES Roles(id) ON DELETE CASCADE,
  FOREIGN KEY (departamento_id) REFERENCES Departamentos(id) ON DELETE CASCADE
);

-- Tabla de Niveles
CREATE TABLE Niveles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Cambiado a BIGINT UNSIGNED
  nombre VARCHAR(50),  -- ('Propio', 'Departamento', 'Facultad')
  color varchar(10) -- Color del texto
);

-- Tabla de Permisos
CREATE TABLE Permisos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Cambiado a BIGINT UNSIGNED
  accion VARCHAR(100),
  tooltip TEXT,
  bgColor VARCHAR(7),  -- Color en formato hexadecimal
  nivel_id BIGINT UNSIGNED,  -- Cambiado a BIGINT UNSIGNED para ser compatible con Niveles.id
  FOREIGN KEY (nivel_id) REFERENCES Niveles(id) ON DELETE CASCADE
);

-- Tabla de Permisos_Rol (sin referencia a niveles)
CREATE TABLE Rol_Permisos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Cambiado a BIGINT UNSIGNED
  rol_id BIGINT UNSIGNED,  -- Cambiado a BIGINT UNSIGNED para ser compatible con Roles.id
  permiso_id BIGINT UNSIGNED,  -- Cambiado a BIGINT UNSIGNED para ser compatible con Permisos.id
  FOREIGN KEY (rol_id) REFERENCES Roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permiso_id) REFERENCES Permisos(id) ON DELETE CASCADE
);
