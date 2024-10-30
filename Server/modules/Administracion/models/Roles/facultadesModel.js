// Modelo Facultad
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');

const FacultadesModel  = sequelize.define('Facultades',{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
},{
    tableName: 'facultades',
    timestamps: false,
});


module.exports = FacultadesModel;