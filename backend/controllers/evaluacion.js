const { response } = require('express');
const validator = require('validator');

const Evaluacion = require('../models/evaluacion');

const obtenerEvaluaciones = async(req, res = repsonse) => {

    // Paginación
    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);
    const id = req.query.id;
    //console.log(registropp);
    try {
        let evaluaciones, total;
        if (id) {
            [evaluaciones, total] = await Promise.all([
                Evaluacion.findById(id),
                Evaluacion.countDocuments()
            ]);
        } else {
            [evaluaciones, total] = await Promise.all([
                Evaluacion.find({}).skip(desde).limit(registropp),
                Evaluacion.countDocuments()
            ]);
        }


        res.status(400).json({
            ok: true,
            msg: 'obtenerEvaluaciones',
            evaluaciones,
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
            msg: 'Error al obtener cursos'
        });
    }
}

/*
post / 
<-- nombre (unico), proyecto?, descripcion?
--> curso registrado
*/
const crearEvaluacion = async(req, res = response) => {

    const { alumno, asignatura } = req.body;


    try {
        // Comrprobar que no existe un usuario con ese email registrado
        const existeEvaluacion = await Evaluacion.findOne({ alumno, asignatura });
              
        if (existeEvaluacion) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un registro para ese alumno y asignatura creado'
            });
        }
        const evaluacion = new Evaluacion(req.body);

        // Almacenar en BD
        await evaluacion.save();

        res.json({
            ok: true,
            msg: 'Tarjeta de Evaluacion Creada',
            evaluacion,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando curso'
        });
    }
}

const actualizarEvaluacion = async(req, res = response) => {

      const { alumno, asignatura } = req.body;
    const uid = req.params.id;

    try {

        /*
        No se deben poder repetir los campos usario y asignatura a la vez
        const existeEvaluacion = await Evaluacion.find({ alumno, asignatura });
        const mismaEvaluacion = await Evaluacion.findById(uid);
        //console.log(existeEvaluacion)
        //console.log(mismaEvaluacion)
        console.log(typeof(existeEvaluacion._id))
        console.log(existeEvaluacion._id.ObjectID)
        if (existeEvaluacion._id != mismaEvaluacion._id) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un registro para ese alumno y asignatura creado'
            });
        }*/

        const evaluacion = await Evaluacion.findByIdAndUpdate(uid, req.body, { new: true });
        res.json({
            ok: true,
            msg: 'Evalucion actualizada',
            evaluacion
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando curso'
        });
    }
}

const borrarEvaluacion = async(req, res = response) => {

    const uid = req.params.id;

    try {
        // Comprobamos si existe el usuario que queremos borrar
        const existeEvaluacion = await Evaluacion.findById(uid);
        if (!existeEvaluacion) {
            return res.status(400).json({
                ok: true,
                msg: 'La evaluacion no existe'
            });
        }
        // Lo eliminamos y devolvemos el curso recien eliminado
        const resultado = await Evaluacion.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Evaluacion eliminada',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error borrando EVALUACION'
        });

    }
}



module.exports = { obtenerEvaluaciones, crearEvaluacion, actualizarEvaluacion, borrarEvaluacion}