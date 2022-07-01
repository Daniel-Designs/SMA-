const {response} = require('express')
const {generarJWT} = require('../helpers/jwt')
const Usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs');


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


module.exports = {login}