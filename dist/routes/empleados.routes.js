"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleados_1 = require("../controllers/empleados");
const router = (0, express_1.Router)();
//GET - Todos los empleados
router.get('/', empleados_1.getEmpleados);
//GET - Todos los empleados de un departamento
router.get('/departamento/:departamentoId', empleados_1.getEmpleadosDepartamento);
//GET - Busqueda empleados de una empresa, departamento y con termino 
router.get('/departamento/busqueda/:empresaId/:termino', empleados_1.getEmpleadosDepartamento);
//GET - Todos los empleados de un departamento
router.get('/:empleadoId', empleados_1.getEmpleado);
//GET - Buscar empeados dentro de un departamento
router.get('/:busqueda/:departamentoId/:busqueda', empleados_1.busquedaEmpleadoDepartamento);
//GET - Obtener empleados empresa
router.get('/empresa/:empresaId', empleados_1.getEmpleadosEmpresa);
//GET - Comprobar empleado existe en una empresa
router.get('/comprobar/empresa/:empresaId/:numeroEmpleado', empleados_1.getEmpleadoDepartamento);
//POST - Crear empleado
router.post('/', empleados_1.createEmpleado);
//PUT - Actualizar Empleado
router.put('/cambiar-status/:idEmpleado', empleados_1.darDeBajaAlta);
router.put('/:idEmpleado', empleados_1.updateEmpleado);
exports.default = router;
