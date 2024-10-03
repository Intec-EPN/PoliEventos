require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, authenticateDB } = require('./config/db');
const routes = require('./modules/routes');
const definirAsociaciones = require('./config/asociaciones');

const app = express();

// Middleware para parsear cuerpos JSON
app.use(express.json());

// Configura CORS
app.use(cors());

// Rutas
app.use('/api', routes); // Usa el archivo de índice para manejar todas las rutas

const PORT = process.env.PORT || 5000;

// Autenticar la conexión a la base de datos
authenticateDB(); // Esto llamará a la función que autentica la base de datos

// Definir asociaciones
definirAsociaciones();

// Sincronizar modelo y BDD
sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });
