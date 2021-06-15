const models = require("../models");
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
    let userExists;
    if (authorization !== undefined) {
        let users = models.usuario
            .findAll({
                attributes: ["token"],
                where: {
                    token: authorization.split(" ")[1]
                }
            });


        users.then(r => {
            userExists = r.length > 0;
        })


    }
    if (!userExists) {
        res.status(401).send({message: "Unauthorized"});
        return false;
    }
    return true;
}