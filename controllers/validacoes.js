const Validador = require('../modules/validador')

const valida_numero = new Validador()

exports.validando_numero = (req, res) => {
    const numero_is_true = valida_numero.validando_number(req.params.numero)
    res.send(numero_is_true)
}