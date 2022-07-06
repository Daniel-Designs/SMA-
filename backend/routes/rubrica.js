const { Router } = require('express');
const { obtenerRubricas, crearRubrica, actualizarRubrica, borrarRubrica } = require('../controllers/rubrica');
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
], obtenerRubricas);
router.post('/', [
    validarJWT,
    check('dimensiones', 'El argumento dimensiones es obligatorio').not().isEmpty(),
    check('valoraciones', 'El argumento valoraciones es obligatorio').not().isEmpty(),
    check('asignatura', 'El identificador de Asignatura no es válido').isMongoId(),
    validarCampos,
], crearRubrica);
router.put('/:id', [
    validarJWT,
    check('dimensiones', 'El argumento dimensiones es obligatorio').not().isEmpty(),
    check('valoraciones', 'El argumento valoraciones es obligatorio').not().isEmpty(),
    check('asignatura', 'El identificador de Asignatura no es válido').isMongoId(),
    validarCampos,
], actualizarRubrica);
router.delete('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], borrarRubrica);

module.exports = router;