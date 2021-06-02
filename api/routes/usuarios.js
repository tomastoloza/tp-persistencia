var express = require("express");
var router = express.Router();
var models = require("../models");
const messageFactory = require("./messageFactory")
const {randomString} = messageFactory


router.get("/", (req, res) => {
    models.usuario
        .findAll({
            attributes: ["id", "nombre", "token"],
        })
        .then(usuario => res.send(usuario))
        .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
    let token = randomString(32, '#aA')
    models.usuario.create(
        {
            nombre: req.body.nombre,
            password: req.body.password,
            token: token
        }
    ).then(
        usuario => res.status(201).send({
            id: usuario.id,
            token: token
        })
    ).catch(
        error => {
            if (error === "SequelizeUniqueConstraintError: Validation error") {
                res.status(400).send('Bad request: existe otro usuario con el mismo nombre')
            } else {
                console.log(`Error al intentar insertar en la base de datos: ${error}`)
                res.status(500).send(error)
            }
        }
    )
});

//Podemos usar este metodo para validar si existe el usuario en la db
const findUser = (id, {onSuccess, onNotFound, onError}) => {
    models.usuario
        .findOne({
            attributes: ["id", "nombre", "token"],
            where: {id}
        })
        .then(usuario => (usuario ? onSuccess(usuario) : onNotFound()))
        .catch(() => onError());
};

router.get("/:id", (req, res) => {
    findUser(req.params.id,
        {
            onSuccess: usuario => res.send(usuario),
            onNotFound: () => res.sendStatus(404),
            onError: () => res.sendStatus(500)
        }
    );
});

// router.put("/:id", (req, res) => {
// });
//

router.delete("/:id", (req, res) => {
    //DELATE ROW
    const onSuccess = usuario =>
        usuario
            .destroy()
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500));
    findUser(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });

});

module.exports = router;
