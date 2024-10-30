// Modelo Esquemas de Categorizacion
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');

const EsquemasCategorizacionModel = sequelize.define('Esquemas_Categorizacion',{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{
    tableName: 'esquemas_categorizacion',
    timestamps: false
});


module.exports = EsquemasCategorizacionModel;