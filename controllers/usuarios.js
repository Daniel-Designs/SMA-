const {response} = require('express')
const Usuario = require('../models/usuarios')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const usuarios = require('../models/usuarios');


const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const registropp = 10;

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre apellidos email rol').skip(desde).limit(registropp),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        msg: 'getUsuarios',
        usuarios,
        page: {
            desde,
            registropp,
            total
        }
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

const actualizarUsuario = async(req, res = response) => {
    
    const {password,email, ...object} = req.body;
    const uid = req.params.id;
    
    try {
        
        const existeEmail = await Usuario.findOne({email: email})
        if(existeEmail){
            if(existeEmail._id != uid){
                return res.status(400).json({
                    ok: false,
                    msg: 'Email ya existe'
                });
            }
        }

        object.email = email

        const usuario = await Usuario.findByIdAndUpdate(uid,object,{new:true})
        res.json({
            ok: true,
            msg: 'actualizarUsuario',
            usuario
        });

    } catch (error) {
        console.log(error)
    }


 
}
const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;
    try {
        const existeEmail = await Usuario.findById(uid)
        if(!existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Uusario no existe'
            });
        }

        const resultado = await Usuario.findByIdAndDelete(uid)
        res.json({
            ok: true,
            msg: 'borrarUsuario'
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: 'Error al borrar '
        });
    }
    
}
module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario }