require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize, authenticateDB } = require('./config/db');
const routes = require('./modules/routes');
const agregarValoresIniciales = require('./config/valoresIniciales');

const app = express();

// Middleware para parsear cuerpos JSON
app.use(express.json());
// Middleware para parsear cookies
app.use(cookieParser());

// Configura CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'https://poli-eventos-test.netlify.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
// Configura CORS
app.use(cors());

// Rutas
app.use('/api', routes); // Archivo de índice para manejar todas las rutas

const PORT = process.env.PORT || 5000;

// Autenticar la conexión a la base de datos
authenticateDB(); // Esto llamará a la función que autentica la base de datos

// Sincronizar modelo y BDD
sequelize.sync({force: true})
    .then(async () => {
        await agregarValoresIniciales();
        console.log('Base de datos sincronizada');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });

