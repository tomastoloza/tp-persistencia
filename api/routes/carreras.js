var express = require("express");
var router = express.Router();
var models = require("../models");
const messageFactory = require("./validations")
const checkPagination = messageFactory.checkPagination
const validateConnection = messageFactory.validateConnection


router.get("/", (req, res) => {
  console.log("comienzo servicio get [carreras]");
    //AUTHENTICATION
    validateConnection(req.headers.authorization, res);
  let pag = req.body.paginaActual - 1
    if(!checkPagination(pag, res))
        return;
    let offset = pag * req.body.cantidadAVer;
    models.carrera
    .findAll({
        // Si paginaActual no esta definida en el body, no se le envia a la request
        offset: offset>0?offset:null,
        limit: req.body.cantidadAVer?req.body.cantidadAVer:null,
        attributes: ["id", "nombre"],
        include: [{as:'materias', model:models.materias, attributes: ["id","nombre"]}]
    })
    .then(carreras => res.send(carreras))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
    //AUTHENTICATION
    if (!validateConnection(req.headers.authorization, res))
        return;

    //INSERT ROW
    models.carrera
    .create({ nombre: req.body.nombre })
    .then(carrera => res.status(201).send({ id: carrera.id }))
    .catch(error => {
      if (error.message === "PRIMARY must be unique") {
        res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findCarrera = (id, { onSuccess, onNotFound, onError }) => {
    if (!validateConnection(req.headers.authorization, res))
        return;

  models.carrera
    .findOne({
        attributes: ["id", "nombre"],
        include: [{as:'materias', model:models.materias, attributes: ["id","nombre"]}],
        where: { id }
    })
    .then(carrera => (carrera ? onSuccess(carrera) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findCarrera(req.params.id, {
    onSuccess: carrera => res.send(carrera),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
    //AUTHENTICATION
    if (!validateConnection(req.headers.authorization, res))
        return;
    //UPDATE ROW
    const onSuccess = carrera =>
    carrera
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error === "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
    //AUTHENTICATION
    if (!validateConnection(req.headers.authorization, res))
        return;

    //DELATE ROW
    const onSuccess = carrera =>
    carrera
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
