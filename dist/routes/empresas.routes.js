"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empresas_1 = require("./../controllers/empresas");
const express_1 = require("express");
const validar_jwt_1 = require("../middleware/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', [
    validar_jwt_1.validarJWT
], empresas_1.getEmpresas);
router.get('/:idEmpresa', [
    validar_jwt_1.validarJWT,
], empresas_1.getEmpresa);
router.post('/', [
    validar_jwt_1.validarJWT,
    validar_jwt_1.validarADMIN_ROLE
], empresas_1.createEmpresa);
router.put('/:idEmpresa', [
    validar_jwt_1.validarJWT,
], empresas_1.updateEmpresa);
exports.default = router;
