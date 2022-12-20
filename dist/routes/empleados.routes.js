"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validar_jwt_1 = require("./../middleware/validar-jwt");
const express_1 = require("express");
const empleados_1 = require("../controllers/empleados");
const router = (0, express_1.Router)();
//GET - Todos los empleados
router.get('/', [validar_jwt_1.validarJWT], empleados_1.getEmpleados);
//GET - Todos los empleados de un departamento
router.get('/departamento/:departamentoId', [validar_jwt_1.validarJWT], empleados_1.getEmpleadosDepartamento);
//GET - Busqueda empleados de una empresa, departamento y con termino 
router.get('/departamento/busqueda/:empresaId/:termino', [validar_jwt_1.validarJWT], empleados_1.getEmpleadosDepartamento);
//GET - Todos los empleados de un departamento
router.get('/:empleadoId', [validar_jwt_1.validarJWT], empleados_1.getEmpleado);
//GET - Todos los empleados de un departamento
router.delete('/:empleadoId', [validar_jwt_1.validarJWT], empleados_1.deleteEmpleado);
//GET - Buscar empeados dentro de un departamento
router.get('/busqueda/:empresaId', [validar_jwt_1.validarJWT], empleados_1.busquedaEmpleadoEDepartamento);
//GET - Obtener empleados empresa
router.get('/empresa/:empresaId', [validar_jwt_1.validarJWT], empleados_1.getEmpleadosEmpresa);
//GET - Comprobar empleado existe en una empresa
router.get('/comprobar/empresa/:empresaId/:numeroEmpleado', [validar_jwt_1.validarJWT], empleados_1.getEmpleadoDepartamento);
//POST - Crear empleado
router.post('/', [validar_jwt_1.validarJWT], empleados_1.createEmpleado);
//PUT - Actualizar Empleado
router.put('/cambiar-status/:idEmpleado', [validar_jwt_1.validarJWT], empleados_1.darDeBajaAlta);
router.put('/:idEmpleado', [validar_jwt_1.validarJWT], empleados_1.updateEmpleado);
exports.default = router;
