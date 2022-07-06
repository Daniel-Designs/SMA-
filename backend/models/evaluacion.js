const { Schema, model } = require('mongoose');

const EvaluacionSchema = Schema({
    evaluacionConinua: {
        type: Number,
    },
    evaluacionProfesor: {
        type: Number
    },
    evaluacionProyecto: {
        type: Number
    },
    evaluacionFinal: {
        type: Number
    },
    asignatura: {
        type: Schema.Types.ObjectId,
        ref: 'Asignatura',
        require: true
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
}, { collection: 'evaluaciones' });

EvaluacionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Evaluacion', EvaluacionSchema);