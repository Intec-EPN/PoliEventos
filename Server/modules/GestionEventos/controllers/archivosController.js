const multer = require("multer");
const fs = require("fs");
const path = require("path");


// Configuración de multer para guardar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../../archivosEventos");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const subirArchivos = async (req, res) => {
  upload.array("files")(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al subir archivos" });
    }
    res.status(200).json({ message: "Archivos subidos exitosamente" });
  });
}

const eliminarArchivo = async (req, res) => {
  const { nombreArchivo } = req.params;
  const filePath = path.join(__dirname, "../../../archivosEventos", nombreArchivo);

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al eliminar el archivo" });
      }
      res.status(200).json({ message: "Archivo eliminado exitosamente" });
    });
  } else {
    res.status(404).json({ error: "Archivo no encontrado" });
  }
}

const editarNombreArchivo = async (req, res) => {
  const { nombreArchivo } = req.params;
  const { nuevoDepartamento } = req.body;
  const filePath = path.join(__dirname, "../../../archivosEventos", nombreArchivo);

  if (fs.existsSync(filePath)) {
    const partes = nombreArchivo.split("__");
    if (partes.length === 3) {
      const nuevoNombreArchivo = `${partes[0]}__${partes[1]}__${nuevoDepartamento}`;
      const nuevoFilePath = path.join(__dirname, "../../../archivosEventos", nuevoNombreArchivo);

      fs.rename(filePath, nuevoFilePath, (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al renombrar el archivo" });
        }
        res.status(200).json({ message: "Archivo renombrado exitosamente" });
      });
    } else {
      res.status(400).json({ error: "Formato de nombre de archivo incorrecto" });
    }
  } else {
    res.status(404).json({ error: "Archivo no encontrado" });
  }
}

const obtenerArchivosPorEvento = async (req, res) => {
  const { idEvento } = req.params;
  const uploadPath = path.join(__dirname, "../../../archivosEventos");

  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer los archivos" });
    }

    const archivosEvento = files.filter(file => file.includes(`__${idEvento}__`));
    res.status(200).json({ archivos: archivosEvento });
  });
}

module.exports = {
  subirArchivos,
  eliminarArchivo,
  editarNombreArchivo,
  obtenerArchivosPorEvento,
};