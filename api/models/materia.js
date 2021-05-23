'use strict';
module.exports = (sequelize, DataTypes) => {
    const materia = sequelize.define('materias', {
        nombre: DataTypes.STRING,
        carreraId: DataTypes.INTEGER
    }, {});
    materia.associate = function(models) {

        materia.belongsTo(models.carrera// modelo al que pertenece
            , {
                as: 'carreraRelacionada',
                foreignKey: 'carreraId'     // campo con el que voy a igualar
            })
    }
        return materia;
    };