const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');

const EventosCategoriasModel = sequelize.define('eventos_categorias', {
    evento_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true, 
        references: {
            model: 'eventos',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    categoria_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true, 
        references: {
            model: 'categorias',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'eventos_categorias',
    timestamps: false,
});

module.exports = EventosCategoriasModel;