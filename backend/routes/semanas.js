const { Router } = require('express');
const { obtenerSemanas, crearSemana, actualizarSemana, borrarSemana } = require('../controllers/semanas');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');
const { validarJWT } = require('../middleware/validarJWT');

const router = Router();

router.get('/', [
    validarJWT,
    // Campos opcionales que si vienen los validamos desde e id
    check('id', 'El id del asignatura debe ser válido').optional().isMongoId(),
    check('desde', 'El desde debe ser un número').optional().isNumeric(),
    validarCampos,
], obtenerSemanas);
router.post('/', [
    validarJWT,
    check('numeroSemana', 'El argumento numero de semana es obligatorio').not().isEmpty().trim(),
    check('asignatura', 'El argumento asignatura es obligatorio').isMongoId(),
    check('grupo', 'El argumento grupo no es válido').isMongoId(),
    check('usuarioCalificado', 'El identificador de usuario no es válido').isMongoId(),
    check('usuarioCalificador', 'El identificador de usuario2 no es válido').isMongoId(),
    validarCampos,
], crearSemana);
router.put('/:id', [
    validarJWT,
    check('numeroSemana', 'El argumento numero de semana es obligatorio').not().isEmpty().trim(),
    check('asignatura', 'El argumento asignatura es obligatorio').isMongoId(),
    check('grupo', 'El argumento grupo no es válido').isMongoId(),
    check('usuarioCalificado', 'El identificador de usuario no es válido').isMongoId(),
    check('usuarioCalificador', 'El identificador de usuario2 no es válido').isMongoId(),
    validarCampos,
], actualizarSemana);
router.delete('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], borrarSemana);

module.exports = router;