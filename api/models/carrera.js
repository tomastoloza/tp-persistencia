'use strict';
module.exports = (sequelize, DataTypes) => {
    const carrera = sequelize.define('carrera', {
        nombre: DataTypes.STRING
    }, {});

    //codigo de asociacion  (tiene muchos:)
    carrera.associate = function (models) {
        carrera.hasMany(models.materias,
            {
                as: 'materias',
                foreignKey: 'carreraId'
            })
    };
    return carrera;
};