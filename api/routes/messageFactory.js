module.exports = {
    checkPagination: checkPagination
}

function checkPagination(pag, res) {
    if (pag < 0) {
        res.status(400).send("Bad Request: Numero de pagina invalido")
        return false;
    }
    return true;
}