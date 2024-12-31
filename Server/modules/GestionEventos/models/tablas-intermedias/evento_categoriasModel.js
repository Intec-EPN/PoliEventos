const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');
const EventosModel = require('../eventoModel');
const CategoriasModel = require('../../../Administracion/models/Categorizaciones/categoriasModel');

const EventosCategoriasModel = sequelize.define('eventos_categorias', {
    evento_id: {
        type: DataTypes.UUID,
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

// Definir asociaciones
EventosCategoriasModel.belongsTo(EventosModel, { foreignKey: 'evento_id' });
EventosCategoriasModel.belongsTo(CategoriasModel, { foreignKey: 'categoria_id' });

module.exports = EventosCategoriasModel;