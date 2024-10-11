CREATE DATABASE poli_eventos_db;
USE poli_eventos_db;

-- Tabla de Facultad
CREATE TABLE Facultades (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
  nombre VARCHAR(100) NOT NULL -- Nombre de la facultad  
);

-- Tabla de Departamentos
CREATE TABLE Departamentos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
  nombre VARCHAR(50) NOT NULL, -- Nombre del departamento
  facultad_id BIGINT UNSIGNED, -- Id de la facultad a la que pertenece el departamento
  FOREIGN KEY (facultad_id) REFERENCES Facultades(id) ON DELETE CASCADE -- Relación con facultades
);

-- Tabla de Roles
CREATE TABLE Roles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  descripcion TEXT,
  departamento_id BIGINT UNSIGNED, -- ID del Departamento al que está asignado el Rol
  facultad_id BIGINT UNSIGNED, -- Id de la facultad a la que pertenece el departamento
  FOREIGN KEY (departamento_id) REFERENCES Departamentos(id) ON DELETE CASCADE, -- Relación con departamentos.    
  FOREIGN KEY (facultad_id) REFERENCES Facultades(id) ON DELETE CASCADE -- Relación con facultades
);

-- Tabla de Niveles
CREATE TABLE Niveles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
  nombre VARCHAR(50),  -- ('Propio', 'Departamento', 'Facultad')
  color varchar(10) -- Color del texto
);

-- Tabla de Permisos
CREATE TABLE Permisos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
  accion VARCHAR(100),
  tooltip TEXT,
  bgColor VARCHAR(7),  -- Color en formato hexadecimal
  nivel_id BIGINT UNSIGNED,  
  FOREIGN KEY (nivel_id) REFERENCES Niveles(id) ON DELETE CASCADE
);

-- Tabla de Permisos_Rol (sin referencia a niveles)
CREATE TABLE Rol_Permisos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
  rol_id BIGINT UNSIGNED,  
  permiso_id BIGINT UNSIGNED,  
  FOREIGN KEY (rol_id) REFERENCES Roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permiso_id) REFERENCES Permisos(id) ON DELETE CASCADE
);
