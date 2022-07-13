const { response } = require('express');
const asignaturas = require('../models/asignaturas');
const {infoToken} = require('../helpers/infotoken')


const Grupo = require('../models/grupos');
const Curso = require('../models/cursos');
const Usuario = require('../models/usuarios');

const obtenerGrupos = async(req, res = repsonse) => {

    // Paginación
    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);
    const id = req.query.id;
    const textos = req.query.texto || '';
    const curso = req.query.curso || '';

    try {
        let grupos, total;
        if (id) {
            [grupos, total] = await Promise.all([
                Grupo.findById(id).populate('asignatura', '-__v'),
                Grupo.countDocuments()
            ]);
        } else {
            // {curso:'', {$or: {nombre : '', nombrecorto:''}}
            let query = {};
            if (textos !== '') {
                texto = new RegExp(textos, 'i');
                if (curso !== '') {
                    query = { curso: curso, $or: [{ nombre: texto }, { proyecto: texto }] };
                } else {
                    query = { $or: [{ nombre: texto }, { proyecto: texto }] };
                }
            } else {
                if (curso !== '') {
                    query = { asignatura: curso };
                } else {
                    query = {};
                }
            };


            [grupos, total] = await Promise.all([
                Grupo.find(query).skip(desde).limit(registropp).populate('asignatura', '-__v'),
                Grupo.countDocuments(query)
            ]);
        }

        res.json({
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


const actualizarLista = async(req, res) => {

    const id = req.params.id;
    const lista = req.body.lista;

    // Solo puede crear usuarios un admin
    const token = req.header('x-token');
    // lo puede actualizar un administrador o el propio usuario del token
    if (!(infoToken(token).rol === 'ADMINISTRADOR')) {
        return res.json({
            ok: false,
            msg: 'No tiene permisos para modificar lista de profesores/alumnos de asignatura',
        });
    }

    // Antes de insertar, limpiamos la lista de posibles duplicados o no existentes
    let listaInsertar = [];
    try {
        const usuarios = await Usuario.find({ _id: { $in: lista } }, { _id: 0, 'usuario': '$_id' });
        const objeto = { alumnos: usuarios };
        const grupo = await Grupo.findByIdAndUpdate(id, objeto, { new: true });
        res.json({
            ok: true,
            msg: `Grupo - Actualizar lista de aluumno`,
            grupo
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: `Error al actualizar listas de alumnos de grupo`
        });
    }
}


module.exports = { obtenerGrupos, crearGrupo, actualizarGrupo, borrarGrupo, actualizarLista }