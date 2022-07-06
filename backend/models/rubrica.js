const { Schema, model } = require('mongoose');

const RubricaSchema = Schema({
    dimensiones: [{
        type: String
    }],
    valoraciones:[{
        type: String
    }],
    asignatura: {
        type: Schema.Types.ObjectId,
        ref: 'Asignatura',
        require: true
    }
}, { collection: 'rubricas' });

RubricaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Rubrica', RubricaSchema);