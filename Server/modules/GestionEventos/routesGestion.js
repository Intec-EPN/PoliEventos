const express = require('express');
const router = express.Router();

const { crearEvento, obtenerEventos, eliminarEvento, editarEvento } = require('./controllers/eventosController');
const { obtenerDepartamentosId } = require('../Administracion/controllers/Roles/departamentosController');
const { obtenerEsquemasCategoriasCalendario } = require('../Administracion/controllers/Categorizaciones/esquemasController');
const { obtenerPermisosPorRol } = require('../Administracion/controllers/Roles/permisosController');
const { subirArchivos, eliminarArchivo, editarNombreArchivo, obtenerArchivosPorEvento, eliminarArchivos, descargarArchivo, descargarArchivosZip, editarNombresArchivosPorEvento } = require('./controllers/archivosController');

// Rutas de eventos
router.post('/', crearEvento);
router.get('/', obtenerEventos);
router.delete('/:id', eliminarEvento);
router.put('/:id', editarEvento);

// Obtener departamentos
router.get('/departamentos', obtenerDepartamentosId);
// Obtener esquemas y categorias
router.get('/esquemas_categorias', obtenerEsquemasCategoriasCalendario);
// Obtener permisos
router.get('/permisos/:rolId', obtenerPermisosPorRol);

// Subir archivos
router.post('/subir', subirArchivos);
// Editar nombre de archivo
router.patch('/archivo/:nombreArchivo', editarNombreArchivo);
// Eliminar archivo
router.delete('/archivo/:nombreArchivo/:eventoId', eliminarArchivo);
// Eliminar archivos
router.delete('/archivo/:eventoId', eliminarArchivos);
// Obtener archivos por evento
router.get('/archivos/:idEvento', obtenerArchivosPorEvento);
// Descargar archivos
router.get('/archivos/descargar/:nombreArchivo', descargarArchivo);
// Descargar archivos ZIP
router.post('/descargar-zip', descargarArchivosZip);
// Editar nombres de archivos por evento
router.patch('/archivos/:eventoId', editarNombresArchivosPorEvento);

module.exports = router;
