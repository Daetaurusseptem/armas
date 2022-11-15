"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expedientes_1 = require("../controllers/expedientes");
const router = (0, express_1.Router)();
//GET - Obtener todas las areas existentes
router.get('/:empresaId/:areaId/:empleadoId', expedientes_1.getExpedienteEmpleado);
exports.default = router;
