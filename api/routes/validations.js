let models = require("../models");
let express = require("express");
let router = express.Router();

module.exports = {
    checkPagination: checkPagination,
    validateConnection: validateConnection,
}

function checkPagination(pag, res) {
    if (pag < 0) {
        res.status(400).send("Bad Request: Numero de pagina invalido")
        return false;
    }
    return true;
}

function validateConnection(authorization, res) {
    //Si el user manda autenticacion
    if (authorization !== undefined) {
        //Buscar el token en la db
        let users = models.usuario
            .findAll({
                attributes: ["token"],
                where: {
                    token: authorization.split(" ")[1]
                }
            });
        //Definir si existe el user en la db
        if (users.then(result => {
            return result.length > 0;
        })) {
            return true;
        }
    }
    //res.status(401).send({message: "Unauthorized"});
    return false;
}



