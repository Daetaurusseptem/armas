"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expedientes_1 = require("./../controllers/expedientes");
const express_1 = require("express");
const expedientes_2 = require("../controllers/expedientes");
const router = (0, express_1.Router)();
//*GET - Obtener todas las areas existentes
router.get('/:empresaId/:areaId/:empleadoId', expedientes_2.getExpedienteEmpleado);
//*GET - Obtener todos los tipos de expedientes de un area existentes en una empresa
router.get('/tipos/todo/:empresaId/:areaId', expedientes_2.getTiposExpedientesArea);
//*GET - Obtener todos los tipos de expedientes de un area existentes en una empresa que ademas sean obligatorios
router.get('/tipos/todo/obligatorio/:empresaId/:areaId', expedientes_1.getExpedientesObligatorios);
//*POST - Crear Tipo de Expediente de Area
router.post('/tipos/todo/crear-tipo/:empresaId/:areaId', expedientes_2.crearTipoExpedienteArea);
//*DELETE 
router.delete('/:idExpediente', expedientes_2.eliminarExpediente);
exports.default = router;
