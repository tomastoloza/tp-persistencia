let models = require("../models");

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

async function validateConnection(req, res, next) {
    //Si el user manda autenticacion
    if (req.headers && req.headers.authorization !== undefined) {
        //Buscar el token en la db
        let users = models.usuario
            .findAll({
                attributes: ["token"],
                where: {
                    token: req.headers.authorization.split(" ")[1]
                }
            });
        //Definir si existe el user en la db
        let userExists = await users.then(result => {
            return Object.keys(result).length > 0;
        });
        if (userExists) {
            return next();
        }
    }
    res.status(401).send("Unauthorized!");
}




