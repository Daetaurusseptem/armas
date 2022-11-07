"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleados_1 = require("../controllers/empleados");
const router = (0, express_1.Router)();
//GET - Todos los empleados
router.get('/', empleados_1.getEmpleados);
//GET - Todos los empleados de un departamento
router.get('/:departamentoId', empleados_1.getEmpleadosDepartamento);
//GET - Buscar empeados dentro de un departamento
router.get('/:busqueda/:departamentoId/:busqueda', empleados_1.busquedaEmpleadoDepartamento);
//GET - Comprobar empleado existe en una empresa
router.get('/comprobar/empresa/:empresaId/:numeroEmpleado', empleados_1.getEmpleadoDepartamento);
//POST - Crear empleado
router.post('/', empleados_1.createEmpleado);
//PUT - Actualizar Empleado
router.put('/cambiar-status/:idEmpleado', empleados_1.darDeBajaAlta);
exports.default = router;
