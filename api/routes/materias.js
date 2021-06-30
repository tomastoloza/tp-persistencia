let express = require("express");
let router = express.Router();
let models = require("../models");
const {checkPagination, validateConnection} = require("./validations")

router.use(validateConnection);
router.get("/", (req, res) => {

    console.log("comienzo servicio get [materias]");
    let pag = req.body.paginaActual - 1
    if(!checkPagination(pag, res))
        return;

    let offset = pag * req.body.cantidadAVer;
    // Si paginaActual no esta definida en el body, no se le envia a la request
    models.materias
        .findAll({
            attributes: ["id", "nombre", "carreraId"],
            include: [{as:'Carrera-Relacionada', model:models.carrera, attributes: ["id","nombre"]}],
            offset: offset>0?offset:null,
            limit: req.body.cantidadAVer?req.body.cantidadAVer:null,
        })
        .then(materia => res.send(materia))
        .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {

    models.materias
        .create({
            nombre: req.body.nombre,
            carreraId: req.body.carreraId
        })
        .then(materia => res.status(201).send({id: materia.id}))
        .catch(error => {
            if (error === "SequelizeUniqueConstraintError: Validation error") {
                res.status(400).send('Bad request: existe otra materia con el mismo nombre')
            } else {
                console.log(`Error al intentar insertar en la base de datos: ${error}`)
                res.sendStatus(500)
            }
        });
});

const findMateria = (id, {onSuccess, onNotFound, onError}) => {

    models.materias
        .findOne({
            attributes: ["id", "nombre", "carreraId"],
            where: {id}
        })
        .then(materia => (materia ? onSuccess(materia) : onNotFound()))
        .catch(() => onError());
};

router.get("/:id", (req, res) => {

    findMateria(req.params.id, {
        onSuccess: materia => res.send(materia),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });
});

router.put("/:id", (req, res) => {

    const onSuccess = materia =>
        materia
            .update({
                nombre: req.body.nombre,
                carreraId: req.body.carreraId
            }, {fields: ["nombre", "carreraId"]})
            .then(() => res.sendStatus(200))
            .catch(error => {
                if (error === "SequelizeUniqueConstraintError: Validation error") {
                    res.status(400).send('Bad request: existe otra materia con el mismo nombre')
                } else {
                    console.log(`Error al intentar actualizar la base de datos: ${error}`)
                    res.sendStatus(500)
                }
            });
    findMateria(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });
});

router.delete("/:id", (req, res) => {

    const onSuccess = materia =>
        materia
            .destroy()
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500));
    findMateria(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });
});

module.exports = router;
