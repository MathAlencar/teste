const Validador = require('../modules/validador')

const valida_numero = new Validador()

exports.validando_numero = (req, res) => {
    const numero_is_true = valida_numero.validando_number(req.params.numero)
    res.send(numero_is_true)
}

exports.formatandoDados = async (req, res) =>{
    const obj = await valida_numero.tratando_dados(req.params.numero)
    res.send(obj)
}