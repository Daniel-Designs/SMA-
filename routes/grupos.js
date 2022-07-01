/*
Ruta base: /api/grupos
*/

const { Router } = require('express');
const { obtenerGrupos, crearGrupo, actualizarGrupo, borrarGrupo } = require('../controllers/grupos');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');
const { validarJWT } = require('../middleware/validarJWT');

const router = Router();

router.get('/', validarJWT, obtenerGrupos);
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

module.exports = router;