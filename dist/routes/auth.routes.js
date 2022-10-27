"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../controllers/auth");
const express_1 = require("express");
const { check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validarCampos');
const router = (0, express_1.Router)();
//GET - Obtener todas las areas existentes
router.post('/', [
    check('email', 'Porfavor ingrese el correo'),
    check('password', 'Porfavor ingrese password'),
    validarCampos
], auth_1.login);
router.get('/renew', [
    validarJWT
], auth_1.renewToken);
exports.default = router;
