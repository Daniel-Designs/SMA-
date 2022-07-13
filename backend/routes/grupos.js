/*
Ruta base: /api/grupos
*/

const { Router } = require('express');
const { obtenerGrupos, crearGrupo, actualizarGrupo, borrarGrupo, actualizarLista} = require('../controllers/grupos');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');
const { validarJWT } = require('../middleware/validarJWT');

const router = Router();

router.get('/',[
        check('id', 'El id del asignatura debe ser válido').optional().isMongoId(),
        check('desde', 'El desde debe ser un número').optional().isNumeric(), 
        validarJWT], obtenerGrupos);

router.post('/', [
    validarJWT,
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearGrupo);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], actualizarGrupo);
router.delete('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], borrarGrupo);

router.put('/lista/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
], actualizarLista);

module.exports = router;