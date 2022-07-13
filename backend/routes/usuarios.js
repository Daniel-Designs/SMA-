const {getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario, actualizarPassword,listaUsuarios,listaUsuariosRol} = require('../controllers/usuarios')
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
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
    validarRol,
    validarJWT
], actualizarUsuario);

router.put('/np/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    check('password', 'El argumento password es obligatorio').not().isEmpty().trim(),
    check('nuevopassword', 'El argumento nuevopassword es obligatorio').not().isEmpty().trim(),
    check('nuevopassword2', 'El argumento nuevopassword2 es obligatorio').not().isEmpty().trim(),
    // campos que son opcionales que vengan pero que si vienen queremos validar el tipo
    validarCampos,
], actualizarPassword);

router.delete('/:id', [
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
    validarJWT
], borrarUsuario);

router.post('/rol/:rol', [
    validarJWT,
    check('rol', 'Debe indicar un rol de búsqueda').not().isEmpty().trim(),
    validarCampos,
], listaUsuariosRol);
router.post('/lista', [
    validarJWT,
], listaUsuarios);


module.exports = router;