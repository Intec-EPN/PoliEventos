const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');
const EventosModel = require('../eventoModel');
const PersonasCargoModel = require('../personasCargoModel');


const EventosPersonasCargoModel = sequelize.define('eventos_personas_cargo', {
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
    persona_cargo_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'personas_cargo',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'eventos_personas_cargo',
    timestamps: false,
});

// Definir asociaciones
EventosPersonasCargoModel.belongsTo(EventosModel, { foreignKey: 'evento_id' });
EventosPersonasCargoModel.belongsTo(PersonasCargoModel, { foreignKey: 'persona_cargo_id' });

module.exports = EventosPersonasCargoModel;