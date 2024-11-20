const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../../config/db');


const EventosPersonasCargoModel = sequelize.define('eventos_personas_cargo', {
    evento_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: 'eventos',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    persona_cargo_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
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

module.exports = EventosPersonasCargoModel;