const Usuario = require('../models/usuarios')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');


const getUsuarios = async(req, res) => {
    res.json({
        ok: true,
        msg: 'getUsuarios'
    });
}

const crearUsuario = async(req, res) => {

    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(); // generamos un salt, una cadena aleatoria
    const cpassword = bcrypt.hashSync(password, salt); // y aquí ciframos la contraseña

    const exiteEmail = await Usuario.findOne({ email: email });
    if (exiteEmail) {
     return res.status(400).json({
       ok: false,
       msg: 'Email ya existe'
     });
    }
    const usuario = new Usuario(req.body);
    usuario.password = cpassword;
    await usuario.save();
    res.json({
       ok: true,
       msg: 'crearUsuarios',
       usuario
     });
}

const actualizarUsuario = async(req, res) => {
    res.json({
        ok: true,
        msg: 'actualizarUsuario'
    });
}
const borrarUsuario = async(req, res) => {
    res.json({
        ok: true,
        msg: 'borrarUsuario'
    });
}
module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario }