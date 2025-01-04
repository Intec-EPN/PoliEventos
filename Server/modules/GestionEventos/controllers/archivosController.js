const multer = require("multer");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");


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
  const { nombreArchivo, eventoId } = req.params;
  const uploadPath = path.join(__dirname, "../../../archivosEventos");

  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer los archivos" });
    }

    const archivoAEliminar = files.find(file => {
      const [nombre, resto] = file.split("__");
      return nombre === nombreArchivo && resto.startsWith(eventoId);
    });

    if (archivoAEliminar) {
      const filePath = path.join(uploadPath, archivoAEliminar);
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al eliminar el archivo" });
        }
        res.status(200).json({ message: "Archivo eliminado exitosamente" });
      });
    } else {
      res.status(404).json({ error: "Archivo no encontrado" });
    }
  });
}

const eliminarArchivos = async (req, res) => {
  const { eventoId } = req.params;
  const uploadPath = path.join(__dirname, "../../../archivosEventos");

  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer los archivos" });
    }

    const archivosAEliminar = files.filter(file => file.includes(`__${eventoId}__`));

    if (archivosAEliminar.length > 0) {
      archivosAEliminar.forEach(archivo => {
        const filePath = path.join(uploadPath, archivo);
        fs.unlink(filePath, (err) => {
          if (err) {
            return res.status(500).json({ error: "Error al eliminar el archivo" });
          }
        });
      });
      res.status(200).json({ message: "Archivos eliminados exitosamente" });
    } else {
      res.status(200).json({ message: "No se encontraron archivos para el evento" });
    }
  });
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

const editarNombresArchivosPorEvento = async (req, res) => {
  const { eventoId } = req.params;
  let { nuevoDepartamento } = req.body;
  const uploadPath = path.join(__dirname, "../../../archivosEventos");

  // Asegurarse de que nuevoDepartamento sea un array
  if (!Array.isArray(nuevoDepartamento)) {
    nuevoDepartamento = [nuevoDepartamento];
  }

  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer los archivos" });
    }

    const archivosAEditar = files.filter(file => file.includes(`__${eventoId}__`));

    if (archivosAEditar.length > 0) {
      const nuevoDepartamentoTexto = nuevoDepartamento.join("__");
      archivosAEditar.forEach(archivo => {
        const partes = archivo.split("__");
        if (partes.length >= 3) {
          const nuevoNombreArchivo = `${partes[0]}__${partes[1]}__${nuevoDepartamentoTexto}${archivo.substring(archivo.lastIndexOf('.'))}`;
          const filePath = path.join(uploadPath, archivo);
          const nuevoFilePath = path.join(uploadPath, nuevoNombreArchivo);

          fs.rename(filePath, nuevoFilePath, (err) => {
            if (err) {
              return res.status(500).json({ error: "Error al renombrar el archivo" });
            }
          });
        }
      });
      res.status(200).json({ message: "Archivos renombrados exitosamente" });
    } else {
      res.status(200).json({ error: "No se encontraron archivos para el evento" });
    }
  });
};

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

const descargarArchivo = async (req, res) => {
  const { nombreArchivo } = req.params;
  const filePath = path.join(__dirname, "../../../archivosEventos", nombreArchivo);

  if (fs.existsSync(filePath)) {
    res.download(filePath, nombreArchivo, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al descargar el archivo" });
      }
    });
  } else {
    res.status(404).json({ error: "Archivo no encontrado" });
  }
};

const descargarArchivosZip = async (req, res) => {
  const { archivos } = req.body;
  const uploadPath = path.join(__dirname, "../../../archivosEventos");

  const zipFileName = `archivos_${Date.now()}.zip`;
  const zipFilePath = path.join(uploadPath, zipFileName);

  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  output.on("close", () => {
    res.download(zipFilePath, zipFileName, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al descargar el archivo ZIP" });
      }
      fs.unlinkSync(zipFilePath); // Eliminar el archivo ZIP después de la descarga
    });
  });

  archive.on("error", (err) => {
    res.status(500).json({ error: "Error al crear el archivo ZIP" });
  });

  archive.pipe(output);

  archivos.forEach((archivo) => {
    const filePath = path.join(uploadPath, archivo);
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: archivo });
    }
  });

  archive.finalize();
};

module.exports = {
  subirArchivos,
  eliminarArchivo,
  editarNombreArchivo,
  obtenerArchivosPorEvento,
  eliminarArchivos,
  descargarArchivo,
  descargarArchivosZip, // Agregar la nueva función al módulo exportado
  editarNombresArchivosPorEvento,
};