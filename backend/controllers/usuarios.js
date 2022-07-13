const {response} = require('express')
const Usuario = require('../models/usuarios')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const usuarios = require('../models/usuarios');
const {infoToken} = require('../helpers/infotoken')


const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);
    const texto = req.query.texto;
    let textoBusqueda = '';
    if (texto) {
        textoBusqueda = new RegExp(texto, 'i');
        //console.log('texto', texto, ' textoBusqueda', textoBusqueda);
    }
    // Obtenemos el ID de usuario por si quiere buscar solo un usuario
    const id = req.query.id || '';

    //await sleep(1000);
    try {

        // Solo puede listar usuarios un admin
        const token = req.header('x-token');
        if (!((infoToken(token).rol === 'ADMINISTRADOR') || (infoToken(token).uid === id))) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene permisos para listar usuarios',
            });
        }

        let usuarios, total;
        // Si ha llegado ID, hacemos el get /id
        if (id) {

            [usuarios, total] = await Promise.all([
                Usuario.findById(id),
                Usuario.countDocuments()
            ]);

        }
        // Si no ha llegado ID, hacemos el get / paginado
        else {
            if (texto) {
                [usuarios, total] = await Promise.all([
                    Usuario.find({ $or: [{ nombre: textoBusqueda }, { apellidos: textoBusqueda }, { email: textoBusqueda }] }).skip(desde).limit(registropp),
                    Usuario.countDocuments({ $or: [{ nombre: textoBusqueda }, { apellidos: textoBusqueda }, { email: textoBusqueda }] })
                ]);
            } else {
                [usuarios, total] = await Promise.all([
                    Usuario.find({}).skip(desde).limit(registropp),
                    Usuario.countDocuments()
                ]);
            }

        }

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

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error obteniedo usuarios'
        });
    }
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
const listaUsuarios = async(req, res) => {
    const lista = req.body.lista;

    if (!lista) {
        return res.json({
            ok: true,
            msg: 'listaUsuarios',
            usuarios: 'none',
        });
    }

    // Solo puede listar usuarios un admin
    const token = req.header('x-token');
    if (!(infoToken(token).rol === 'ADMINISTRADOR')) {
        return res.status(400).json({
            ok: false,
            msg: 'No tiene permisos para listar usuarios',
        });
    }

    try {
        const usuarios = await Usuario.find({ _id: { $in: lista }, activo: true }).collation({ locale: 'es' }).sort({ apellidos: 1, nombre: 1 });
        res.json({
            ok: true,
            msg: 'listaUsuarios',
            usuarios
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al listar usuarios por uids',
        });
    }

}
const listaUsuariosRol = async(req, res) => {
    const rol = req.params.rol;
    const lista = req.body.lista;

    // Solo puede listar usuarios un admin
    const token = req.header('x-token');
    if (!(infoToken(token).rol === 'ADMINISTRADOR')) {
        return res.status(400).json({
            ok: false,
            msg: 'No tiene permisos para listar usuarios',
        });
    }

    listaB = [];
    if (!lista) { listaB = []; }

    try {
        const usuarios = await Usuario.find({ _id: { $nin: lista }, rol: rol, activo: true }).collation({ locale: 'es' }).sort({ apellidos: 1, nombre: 1 });
        res.json({
            ok: true,
            msg: 'listaUsuarios',
            usuarios
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al listar usuarios por rol',
            error
        });
    }

}

const actualizarPassword = async(req, res = response) => {

    const uid = req.params.id;
    const { password, nuevopassword, nuevopassword2 } = req.body;

    try {
        const token = req.header('x-token');
        // lo puede actualizar un administrador o el propio usuario del token
        if (!((infoToken(token).rol === 'ADMINISTRADOR') || (infoToken(token).uid === uid))) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene permisos para actualizar contraseña',
            });
        }

        const usuarioBD = await Usuario.findById(uid);
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario incorrecto',
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        // Si es el el usuario del token el que trata de cambiar la contraseña, se comprueba que sabe la contraseña vieja y que ha puesto 
        // dos veces la contraseña nueva
        if (infoToken(token).uid === uid) {

            if (nuevopassword !== nuevopassword2) {
                return res.status(400).json({
                    ok: false,
                    msg: 'La contraseña repetida no coincide con la nueva contraseña',
                });
            }

            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Contraseña incorrecta',
                    token: ''
                });
            }
        }

        // tenemos todo OK, ciframos la nueva contraseña y la actualizamos
        const salt = bcrypt.genSaltSync();
        const cpassword = bcrypt.hashSync(nuevopassword, salt);
        usuarioBD.password = cpassword;

        // Almacenar en BD
        await usuarioBD.save();

        res.json({
            ok: true,
            msg: 'Contraseña actualizada'
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al actualizar contraseña',
        });
    }


}
module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, actualizarPassword,listaUsuarios,listaUsuariosRol }