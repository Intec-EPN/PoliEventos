const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');

const EventosModel = sequelize.define('Eventos', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lugar: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    asistentes: {
        type: DataTypes.INTEGER,
    },
    estudiantes: {
        type: DataTypes.INTEGER,
    },
    usuario_id: {
        type: DataTypes.UUID,
        references: {
            model: 'usuarios',
            key: 'id',
        },
    },
    enlaces: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true, // Permitir valores nulos temporalmente
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true, // Permitir valores nulos temporalmente
    },
}, {
    tableName: 'eventos',
    timestamps: true,
});

module.exports = EventosModel;