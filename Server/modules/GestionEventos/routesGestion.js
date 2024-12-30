const express = require('express');
const router = express.Router();

const { crearEvento, obtenerEventos, eliminarEvento, editarEvento } = require('./controllers/eventosController');
const { obtenerDepartamentosId } = require('../Administracion/controllers/Roles/departamentosController');
const { obtenerEsquemasCategoriasCalendario } = require('../Administracion/controllers/Categorizaciones/esquemasController');
const { obtenerPermisosPorRol } = require('../Administracion/controllers/Roles/permisosController');
const { subirArchivos, eliminarArchivo, editarNombreArchivo, obtenerArchivosPorEvento, eliminarArchivos, descargarArchivo, descargarArchivosZip, editarNombresArchivosPorEvento } = require('./controllers/archivosController');
const authMiddleware = require('../Auth/middleware/authMiddleware');
const rolMiddleware = require('./middleware/rolMiddleware');

// Rutas de eventos
router.post('/', authMiddleware, rolMiddleware, crearEvento);
router.get('/', obtenerEventos);
router.delete('/:id', authMiddleware, rolMiddleware, eliminarEvento);
router.put('/:id', authMiddleware, rolMiddleware, editarEvento);

// Obtener departamentos
router.get('/departamentos', obtenerDepartamentosId);
// Obtener esquemas y categorias
router.get('/esquemas_categorias', authMiddleware, rolMiddleware, obtenerEsquemasCategoriasCalendario);
// Obtener permisos
router.get('/permisos/:rolId', authMiddleware, rolMiddleware, obtenerPermisosPorRol);

// Subir archivos
router.post('/subir', authMiddleware, rolMiddleware, subirArchivos);
// Editar nombre de archivo
router.patch('/archivo/:nombreArchivo', authMiddleware, rolMiddleware, editarNombreArchivo);
// Eliminar archivo
router.delete('/archivo/:nombreArchivo/:eventoId', authMiddleware, rolMiddleware, eliminarArchivo);
// Eliminar archivos
router.delete('/archivo/:eventoId', authMiddleware, rolMiddleware, eliminarArchivos);
// Obtener archivos por evento
router.get('/archivos/:idEvento', authMiddleware, rolMiddleware, obtenerArchivosPorEvento);
// Descargar archivos
router.get('/archivos/descargar/:nombreArchivo', authMiddleware, rolMiddleware, descargarArchivo);
// Descargar archivos ZIP
router.post('/descargar-zip', authMiddleware, rolMiddleware, descargarArchivosZip);
// Editar nombres de archivos por evento
router.patch('/archivos/:eventoId', authMiddleware, rolMiddleware, editarNombresArchivosPorEvento);

module.exports = router;
