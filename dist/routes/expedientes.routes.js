"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expedientes_1 = require("../controllers/expedientes");
const router = (0, express_1.Router)();
//*GET - Obtener todas las areas existentes
router.get('/:empresaId/:areaId/:empleadoId', expedientes_1.getExpedienteEmpleado);
//*GET - Obtener todos los tipos de expedientes de un area existentes en una empresa
router.get('/tipos/todo/:empresaId/:areaId', expedientes_1.getTiposExpedientesArea);
//*POST - Crear Tipo de Expediente de Area
router.post('/tipos/todo/crear-tipo/:empresaId/:areaId', expedientes_1.crearTipoExpedienteArea);
//*DELETE
router.delete('/:idExpediente', expedientes_1.eliminarExpediente);
exports.default = router;
