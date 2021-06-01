module.exports = {
    checkPagination: checkPagination,
    validateConnection: validateConnection
}

function checkPagination(pag, res) {
    if (pag < 0) {
        res.status(400).send("Bad Request: Numero de pagina invalido")
        return false;
    }
    return true;
}

function validateConnection(auth, res) {
    if(auth !== "Basic cGVyc2lzdGVuY2lhOjEyMzQ=") { //Credentials in the readme
        res.status(401).send({message: "Unauthorized"})
    }
}