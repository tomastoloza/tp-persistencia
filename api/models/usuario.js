'use strict';
module.exports = (sequelize, DataTypes) => {
    const usuario = sequelize.define('usuario', {
        token: DataTypes.STRING
    }, {});
    usuario.associate = function (models) {
        // associations can be defined here
    };
    //@see: https://github.com/sequelize/sequelize/issues/1026#issuecomment-54877327
    usuario.removeAttribute('id');
    return usuario;
};