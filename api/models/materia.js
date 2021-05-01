'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('materia', {
        nombre: DataTypes.STRING,
        carrera_id: DataTypes.INT
    }, {});
};