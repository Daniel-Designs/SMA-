const { response } = require('express');

const Grupo = require('../models/grupos');


const obtenerGrupos = async(req, res = repsonse) => {

    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);

    try {

        const [grupos, total] = await Promise.all([
            Grupo.find({}).skip(desde).limit(registropp),
            Grupo.countDocuments()
        ]);

        res.status(400).json({
            ok: true,
            msg: 'obtenerGrupos',
            grupos,
            page: {
                desde,
                registropp,
                total
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error al obtener grupos'
        });
    }
}

const crearGrupo = async(req, res = response) => {

    const nombre = String(req.body.nombre).trim();

    try {
      
        const existeGrupo = await Grupo.findOne({ nombre: nombre });

        if (existeGrupo) {
            return res.status(400).json({
                ok: false,
                msg: 'El grupo ya existe'
            });
        }

        const grupo = new Grupo(req.body);
        grupo.nombre = nombre;

        await grupo.save();

        res.json({
            ok: true,
            msg: 'Grupo creado',
            grupo,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando grupo'
        });
    }
}

const actualizarGrupo = async(req, res) => {

    const nombre = String(req.body.nombre).trim();
    const object = req.body;
    const uid = req.params.id;

    try {

        if (nombre) {
            const existeGrupo = await Grupo.findOne({ nombre });
            if (existeGrupo) {
                if (existeGrupo._id != uid) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El grupo ya existe'
                    });
                }
            }
            object.nombre = nombre;
        }

        const grupo = await Grupo.findByIdAndUpdate(uid, object, { new: true });
        res.json({
            ok: true,
            msg: 'Usuario actualizado',
            grupo
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando grupo'
        });
    }
}

const borrarGrupo = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const existeGrupo = await Grupo.findById(uid);
        if (!existeGrupo) {
            return res.status(400).json({
                ok: true,
                msg: 'El grupo no existe'
            });
        }
        const resultado = await Grupo.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Grupo eliminado',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando grupo'
        });

    }
}



module.exports = { obtenerGrupos, crearGrupo, actualizarGrupo, borrarGrupo }