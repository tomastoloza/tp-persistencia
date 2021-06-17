let express = require("express");
let router = express.Router();
const models = require("../models");
const {validateConnection} = require("./validations");
const getToken = (auth) => {
    return auth.split(" ")[1];
}

function findUsers(req) {
    return models.usuario
        .findAll({
            attributes: ["token"],
            where: {
                token: getToken(req.headers.authorization)
            }
        });
}

router.get("/", (req, res) => {

    findUsers(req).then(usuario => res.send(usuario))
        .catch(() => res.sendStatus(500));

});

router.post("/", (req, res) => {
    //AUTHENTICATION

    //INSERT ROW
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

router.get("/", (req, res) => {
    findUsers(req).then(materias => {
        return (materias.length === 0) ? res.sendStatus(404) : res.send(materias);
    })
        .catch(() => {
            res.sendStatus(500);
        });
});

// router.put("/:id", (req, res) => {
// });
//

// router.delete("/:id", (req, res) => {
//
// });

router.use(function (req,res,next){
    if (validateConnection(req.headers.authorization, res)){
        next();
    }else{
        res.status(401).send({message: "Unauthorized"});
    }
});

module.exports = router;
