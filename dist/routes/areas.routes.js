"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const areas_1 = require("./../controllers/areas");
const express_1 = require("express");
const areas_2 = require("../controllers/areas");
const validar_jwt_1 = require("../middleware/validar-jwt");
const router = (0, express_1.Router)();
//GET - Obtener todas las areas existentes
router.get('/', [
    validar_jwt_1.validarJWT
], areas_2.getAreas);
//GET - Obtener area por id | params:empresaId
router.get('/empresa/:empresaId', [
    validar_jwt_1.validarJWT
], areas_1.getAreasEmpresa);
//GET - Obtener Area por id
router.get('/:idArea', [
    validar_jwt_1.validarJWT
], areas_1.getArea);
//DELETE - Eliminar Area
router.delete('/:idArea', [
    validar_jwt_1.validarJWT,
    validar_jwt_1.validarADMIN_ROLE
], areas_1.eliminarArea);
//POST - Crear una nueva area
router.post('/', [
    validar_jwt_1.validarJWT,
    validar_jwt_1.validarADMIN_ROLE
], areas_2.createArea);
//PUT - Actualizar informacion del area
router.put('/:idArea', [
    validar_jwt_1.validarJWT,
    validar_jwt_1.validarADMIN_ROLE
], areas_2.updateArea);
exports.default = router;
