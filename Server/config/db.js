const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

const authenticateDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

module.exports = { sequelize, authenticateDB };
