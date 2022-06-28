const {Schema,model} = require('mongoose') 

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        default: 'ALUMNO'
    },
}, { collection: 'usuarios' });


module.exports = model('Usuario', UsuarioSchema);