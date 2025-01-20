// Modelo Rol
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');
const FacultadesModel = require('./facultadesModel');
const DepartamentosModel = require('./departamentosModel');

const RolesModel = sequelize.define('Roles',{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    departamento_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true, // Puedo tener un rol que no esté asociado a un departamento sino a todos los departamentos de la facultad.
    },
    facultad_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true, 
    } 

},{
    tableName: 'roles', // Nombre de la tabla en mysql
    timestamps: false,  // Desactivo timestamps (createdAt y updatedAt) 
});

// Relaciones:
// Un rol puede estar asociado a un departamento:
RolesModel.belongsTo(DepartamentosModel, {foreignKey: 'departamento_id'});
// Un rol debe estar asociado a una facultad:
RolesModel.belongsTo(FacultadesModel, {foreignKey: 'facultad_id'});



module.exports = RolesModel;
