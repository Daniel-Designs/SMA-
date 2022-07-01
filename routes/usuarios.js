const {getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario} = require('../controllers/usuarios')
const {Router} = require('express')
const { check } = require('express-validator');
const {validarCampos} = require('../middleware/validarCampos')
const {validarRol} = require('../middleware/validarRol')
const {validarJWT} = require('../middleware/validarJWT')

const router = Router();

router.get('/',validarJWT,getUsuarios)

router.post('/', [
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El argumento apellidos es obligatorio').not().isEmpty(),
    check('email', 'El argumento email es obligatorio').not().isEmpty(),
    check('password', 'El argumento password es obligatorio').not().isEmpty(),
    validarCampos,
    validarRol,
    validarJWT
], crearUsuario);

router.put('/:id', [
    check('nombre', 'El argumento nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El argumento apellidos es obligatorio').not().isEmpty(),
    check('email', 'El argumento email es obligatorio').not().isEmpty(),
    check('password', 'El argumento password es obligatorio').not().isEmpty(),
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
    validarRol,
    validarJWT
], actualizarUsuario);

router.delete('/:id', [
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
    validarJWT
], borrarUsuario);


module.exports = router;