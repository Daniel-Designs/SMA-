const { Schema, model } = require('mongoose');

const SemanaSchema = Schema({
    numeroSemana: {
        type: Number,
        require: true,
    },
    asignatura: {
        type: Schema.Types.ObjectId,
        ref: 'Asignatura',
        require: true
    }, 
    grupo: {
        type: Schema.Types.ObjectId,
        ref: 'Grupo',
        require: true
    },
    usuarioCalificado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    usuarioCalificador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    calificacion: [{
        type: Number,
        require:true
    }]

}, { collection: 'semanas' });

SemanaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Semana', SemanaSchema);