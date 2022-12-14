"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middleware/validarCampos");
const validar_jwt_1 = require("../middleware/validar-jwt");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/', [
    validar_jwt_1.validarJWT,
    validar_jwt_1.validarADMIN_ROLE
], user_1.getUsers);
router.get('/:idUsuario', user_1.getUser);
router.post('/', [
    (0, express_validator_1.check)('usuario', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password es obligatorio').not().isEmpty(), validar_jwt_1.validarJWT,
    validar_jwt_1.validarADMIN_ROLE,
    validarCampos_1.validarCampos,
], user_1.createUser);
router.put('/:userId', [
    validar_jwt_1.validarJWT,
    validar_jwt_1.validarADMIN_ROLE
], user_1.updateUser);
// usuario permisos en un area
router.get('/permiso/:areaId/:usuarioId', [validar_jwt_1.validarJWT], user_1.writeOrReadPermissions);
exports.default = router;
