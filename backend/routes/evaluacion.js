const { Router } = require('express');
const { obtenerEvaluaciones, crearEvaluacion, actualizarEvaluacion, borrarEvaluacion } = require('../controllers/evaluacion');
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
], obtenerEvaluaciones);//cambiar todas las funciones
router.post('/', [
    validarJWT,
    check('evaluacionConinua', 'El argumento evaluacionContinua es obligatorio').optional().isNumeric(),
    check('evaluacionProfesor', 'El argumento nombrecorto es obligatorio').optional().isNumeric(),
    check('evaluacionProyecto', 'El argumento evaluacionProyecto no es válido').optional().isNumeric(),
    check('evaluacionFinal', 'El argumento evaluacionFinal no es válido').optional().isNumeric(),    
    // Opcionales lista de profesores, si viene comprobar que es id válido
    check('asignatura', 'El identificador de asignatura no es válido').isMongoId(),
    check('alumno', 'El identificador de alumno no es válido').isMongoId(),
    validarCampos,
], crearEvaluacion);
router.put('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    check('evaluacionConinua', 'El argumento evaluacionContinua es obligatorio').optional().isNumeric(),
    check('evaluacionProfesor', 'El argumento nombrecorto es obligatorio').optional().isNumeric(),
    check('evaluacionProyecto', 'El argumento evaluacionProyecto no es válido').optional().isNumeric(),
    check('evaluacionFinal', 'El argumento evaluacionFinal no es válido').optional().isNumeric(),    
    // Opcionales lista de profesores, si viene comprobar que es id válido
    check('asignatura', 'El identificador de asignatura no es válido').isMongoId(),
    check('alumno', 'El identificador de alumno no es válido').isMongoId(),
    validarCampos,
], actualizarEvaluacion);
router.delete('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], borrarEvaluacion);

module.exports = router;