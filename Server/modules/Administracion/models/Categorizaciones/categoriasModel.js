// Modelo Categorías
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');
const EsquemasCategorizacionModel = require('./esquemasModel');

const CategoriasModel = sequelize.define('Categorias', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    esquema_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: 'esquemas_categorizacion',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: 'categorias',
    timestamps: false,
});

// Relaciones:
// Una categoría pertenece a un esquema. 
CategoriasModel.belongsTo(EsquemasCategorizacionModel, { foreignKey: 'esquema_id' });

module.exports = CategoriasModel;