'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('materias', {
        nombre: DataTypes.STRING,
        carreraId: DataTypes.INTEGER
    }, {});
};