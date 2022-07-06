const { response } = require('express');

const Rubrica = require('../models/rubrica');
const Asignatura = require('../models/asignaturas');



const obtenerRubricas = async(req, res = repsonse) => {

  
    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);
    const id = req.query.id;

    try {


        let rubricas, total;
        if (id) {
            [rubricas, total] = await Promise.all([
                Rubrica.findById(id).populate('asignatura'),
                Rubrica.countDocuments()
            ]);
        } else {
            [rubricas, total] = await Promise.all([
                Rubrica.find({}).skip(desde).limit(registropp).populate('asignatura'),
                Rubrica.countDocuments()
            ]);
        }

        res.json({
            ok: true,
            msg: 'obtenerAsignaturas',
            rubricas,
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
            msg: 'Error al obtener Rubricas'
        });
    }
}

const crearRubrica = async(req, res = response) => {

    const { asignatura, ...obj } = req.body;

    try {

        const existeAsignatura = await Asignatura.findById(asignatura);
        if (!existeAsignatura) {
            return res.status(400).json({
                ok: false,
                msg: 'El la asignatura asiganada a la Rubrica no existe'
            });
        }
        const rubrica = new Rubrica(req.body);
        await rubrica.save();

        res.json({
            ok: true,
            msg: 'Rubrica creada',
            asignatura
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando asignatura'
        });
    }
}

const actualizarRubrica = async(req, res) => {

    const { asignatura } = req.body;
    const uid = req.params.id;

    try {

        // Comprobar que la asignatura que se va a actualizar existe
        const existeRubrica = await Rubrica.findById(uid);
        if (!existeRubrica) {
            return res.status(400).json({
                ok: false,
                msg: 'La Rubrica no existe'
            });
        }

        const existeAsignatura = await Asignatura.findById(asignatura);
        if (!existeAsignatura) {
            return res.status(400).json({
                ok: false,
                msg: 'El la asignatura asiganada a la Rubrica no existe'
            });
        }

        const rubrica = await Rubrica.findByIdAndUpdate(uid, req.body, { new: true });
        res.json({
            ok: true,
            msg: 'Asignatura actualizada',
            rubrica
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando Rubrica'
        });
    }
}

const borrarRubrica = async(req, res = response) => {

    const uid = req.params.id;

    try {
        // Comprobamos si existe el asignatura que queremos borrar
        const existeRubrica = await Rubrica.findById(uid);
        if (!existeRubrica) {
            return res.status(400).json({
                ok: true,
                msg: 'El Rubrica no existe'
            });
        }
        // Lo eliminamos y devolvemos el usuaurio recien eliminado
        const resultado = await Rubrica.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Rubrica eliminada',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error borrando Rubrica'
        });

    }
}



module.exports = { obtenerRubricas, crearRubrica, actualizarRubrica, borrarRubrica }