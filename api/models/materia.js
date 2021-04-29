'use strict';
module.exports = (sequelize, DataTypes) => {

    let Materia = sequelize.define('materia', {
        nombre: DataTypes.STRING,
        id_carrera: DataTypes.INTEGER
    }, {underscored: true})

    let Carrera = sequelize.define('carrera', {
        nombre: DataTypes.STRING
    }, {});

    Materia.associate = function (models) {
        Materia.belongsTo(Carrera)
    };
    return Materia;
};