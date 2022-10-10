"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleados_1 = require("../controllers/empleados");
const router = (0, express_1.Router)();
router.get('/', empleados_1.getEmpleados);
router.post('/', empleados_1.createEmpleado);
router.put('/cambiar-status/:idEmpleado', empleados_1.darDeBajaAlta);
exports.default = router;
