require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize, authenticateDB } = require('./config/db');
const routes = require('./modules/routes');
const ExpositoresModel = require('./modules/GestionEventos/models/expositoresModel');
const EventosExpositoresModel = require('./modules/GestionEventos/models/tablas-intermedias/evento_expositoresModel');

const app = express();

// Middleware para parsear cuerpos JSON
app.use(express.json());
// Middleware para parsear cookies
app.use(cookieParser());

//TODO CORS EN DESARROLLO.
// Configura CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Reemplaza con el dominio de tu cliente
    credentials: true, // Permitir el envío de cookies
};
// Configura CORS
app.use(cors(corsOptions));


// Rutas
app.use('/api', routes); // Archivo de índice para manejar todas las rutas

const PORT = process.env.PORT || 5000;

// Autenticar la conexión a la base de datos
authenticateDB(); // Esto llamará a la función que autentica la base de datos


// Sincronizar modelo y BDD
sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });
