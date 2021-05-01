'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('carrera', {
        nombre: DataTypes.STRING
    }, {});
};