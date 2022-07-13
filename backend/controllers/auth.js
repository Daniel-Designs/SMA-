const {response} = require('express')
const {generarJWT} = require('../helpers/jwt')
const Usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async(req, res=response) => {

    const { email, password } = req.body;
    
    try {
        const usuarioBD = await Usuario.findOne({email});
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos',
                token: ''
            });
        }
        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        if (!validPassword) {
            return res.status(400).json({
            ok: false,
            msg: 'Usuario o contraseña incorrectos',
             token: ''
             });
         }

         const token = await generarJWT(usuarioBD._id,usuarioBD.rol)
         
         res.json({
            ok: true,
            msg: 'Correcto Login',
            uid:usuarioBD._id,
            rol:usuarioBD.rol,
            nombre:usuarioBD.nombre,
            token
        });

        } catch (error) {
                console.log(error);
                return res.status(400).json({
                    ok: false,
                    msg: 'Error en login',
                    token: ''
                });
            }

   
}

const token = async(req, res = response)=>{
   
    try {
        const token = req.headers['x-token'];
        const { uid, rol, ...object } = jwt.verify(token, process.env.JWT);
        
        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: 'Token no valido1',
                token: ''
            });
        }
        const nuevotoken = await generarJWT(uid,rol);
            return res.json({
            ok: true,
            msg: 'token validado',
            uid,
            rol,
            token: nuevotoken
        }); 
    } catch (error) {
        console.log(error);
                return res.status(400).json({
                    ok: false,
                    msg: 'Error token no valido2',
                    token: ''
                });
    }
}

module.exports = {login,token}