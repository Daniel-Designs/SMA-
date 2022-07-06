const { response } = require('express');
const validator = require('validator');
const Semana = require('../models/semanas')
const Asignatura = require('../models/asignaturas');
const Curso = require('../models/cursos');
const Usuario = require('../models/usuarios');


const obtenerSemanas = async(req, res = repsonse) => {

  
    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);
    const id = req.query.id;

    try {


        let semanas, total;
        if (id) {
            [semanas, total] = await Promise.all([
                Semana.findById(id),
                Semana.countDocuments()
            ]);
        } else {
            [semanas, total] = await Promise.all([
                Semana.find({}).skip(desde).limit(registropp).populate('curso').populate('profesores.usuario', '-password -alta -__v').populate('alumnos.usuario', '-password -alta -__v'),
                Semana.countDocuments()
            ]);
        }

        res.json({
            ok: true,
            msg: 'obtenerSemanas',
            semanas,
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
            msg: 'Error al obtener Semanas'
        });
    }
}

const crearSemana = async(req, res = response) => {

   
    try {
        /* Aaqui deberiamos checar si todas las entidades existen*/

        const semana = new Semana(req.body);
      
        // Almacenar en BD
        await semana.save();

        res.json({
            ok: true,
            msg: 'Semana creada',
            semana
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando Semana'
        });
    }
}

const actualizarSemana = async(req, res) => {

    const uid = req.params.id;

    try {

        // Comprobar que la asignatura que se va a actualizar existe
        const existeSemana = await Semana.findById(uid);
        if (!existeSemana) {
            return res.status(400).json({
                ok: false,
                msg: 'La Semana no existe'
            });
        }

        const semana = await Semana.findByIdAndUpdate(uid,req.body, { new: true });
        res.json({
            ok: true,
            msg: 'Semana actualizada',
            semana
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error Aactualizando Semana'
        });
    }
}

const borrarSemana = async(req, res = response) => {

    const uid = req.params.id;

    try {
        // Comprobamos si existe el asignatura que queremos borrar
        const existeAsignatura = await Semana.findById(uid);
        if (!existeAsignatura) {
            return res.status(400).json({
                ok: true,
                msg: 'El Semana no existe'
            });
        }
        // Lo eliminamos y devolvemos el usuaurio recien eliminado
        const resultado = await Semana.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Asignatura eliminada',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error borrando Semana'
        });

    }
}



module.exports = { obtenerSemanas, crearSemana, actualizarSemana, borrarSemana }