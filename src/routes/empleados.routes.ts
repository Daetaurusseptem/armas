import { validarJWT } from './../middleware/validar-jwt';
import {Router} from 'express';

import {getEmpleados, createEmpleado, darDeBajaAlta, getEmpleadosDepartamento, getEmpleadoDepartamento, getEmpleadosEmpresa, updateEmpleado, getEmpleado, busquedaEmpleadoEDepartamento, deleteEmpleado} from '../controllers/empleados';

const router =  Router();
//GET - Todos los empleados
router.get( '/',[validarJWT], getEmpleados )
//GET - Todos los empleados de un departamento
router.get('/departamento/:departamentoId',[validarJWT], getEmpleadosDepartamento)
//GET - Busqueda empleados de una empresa, departamento y con termino 
router.get('/departamento/busqueda/:empresaId/:termino',[validarJWT], getEmpleadosDepartamento)
//GET - Todos los empleados de un departamento
router.get('/:empleadoId',[validarJWT], getEmpleado)
//GET - Todos los empleados de un departamento
router.delete('/:empleadoId',[validarJWT], deleteEmpleado)
//GET - Buscar empeados dentro de un departamento
router.get('/busqueda/:empresaId',[validarJWT], busquedaEmpleadoEDepartamento)
//GET - Obtener empleados empresa
router.get('/empresa/:empresaId',[validarJWT], getEmpleadosEmpresa) 

//GET - Comprobar empleado existe en una empresa
router.get('/comprobar/empresa/:empresaId/:numeroEmpleado',[validarJWT], getEmpleadoDepartamento)
//POST - Crear empleado
router.post( '/',[validarJWT], createEmpleado )
//PUT - Actualizar Empleado
router.put('/cambiar-status/:idEmpleado',[validarJWT], darDeBajaAlta)
router.put('/:idEmpleado',[validarJWT], updateEmpleado)


export default router 