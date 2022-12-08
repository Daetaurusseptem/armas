"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const departamentos_1 = require("./../controllers/departamentos");
const express_1 = require("express");
const departamentos_2 = require("../controllers/departamentos");
const validar_jwt_1 = require("../middleware/validar-jwt");
const router = (0, express_1.Router)();
router.get('/', [
    validar_jwt_1.validarJWT
], departamentos_2.getDepartamentos);
router.get('/:idDepartamento', [
    validar_jwt_1.validarJWT
], departamentos_2.getDepartamento);
router.delete('/:idDepartamento', [
    validar_jwt_1.validarJWT
], departamentos_1.deleteDepartamento);
router.post('/', [
    validar_jwt_1.validarJWT
], departamentos_2.createDepartamentos);
router.put('/:departamentoId', [
    validar_jwt_1.validarJWT
], departamentos_1.updateDepartamento);
router.get('/empresa/:empresaId', [
    validar_jwt_1.validarJWT
], departamentos_2.getDepartamentoEmpresaId);
exports.default = router;
