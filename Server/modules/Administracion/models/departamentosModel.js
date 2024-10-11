// Modelo Departamento
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/db');
const FacultadesModel = require('./facultadesModel');

const DepartamentosModel = sequelize.define('Departamentos',{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    facultad_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false, 
    } 
},{
    tableName: 'departamentos',
    timestamps: false,
});

// Relaciones:
// Un departamento pertenece a una facultad.
DepartamentosModel.belongsTo(FacultadesModel, {foreignKey: 'facultad_id'});

module.exports = DepartamentosModel;