const {login} = require('../controllers/auth')
const {Router} = require('express')
const { check } = require('express-validator');
const {validarCampos} = require('../middleware/validarCampos')


const router = Router();

router.post('/', [
    check('email', 'El argumento email es obligatorio').not().isEmpty(),
    check('password', 'El argumento password es obligatorio').not().isEmpty(),
    validarCampos
], login);

module.exports = router;