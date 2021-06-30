let express = require("express");
let router = express.Router();
const models = require("../models");
const getToken = (auth) => {
    return auth.split(" ")[1];
}

router.post("/", (req, res) => {
    models.usuario
        .create({token: getToken(req.headers.authorization)})
        .then(user => res.status(201).send({token: user.token}))
        .catch(error => {
            console.log("error =", error.errors[0].message);
            if (error.errors[0].message === "PRIMARY must be unique") {
                res.status(400).send('Bad request: ya existe este usuario')
            } else {
                console.log(`Error al intentar insertar en la base de datos: ${error}`)
                res.sendStatus(500)
            }
        });
});

module.exports = router;
