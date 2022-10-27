import { login, renewToken } from './../controllers/auth';
import {Router} from 'express';
const {check} = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validarCampos');
const router =  Router();
//GET - Obtener todas las areas existentes
router.post('/',[
    check('email','Porfavor ingrese el correo'),
    check('password','Porfavor ingrese password'),
    validarCampos
], login);

router.get('/renew',
[
    validarJWT
], renewToken)

export default router