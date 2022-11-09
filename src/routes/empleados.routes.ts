import {Router} from 'express';

import {getEmpleados, createEmpleado, darDeBajaAlta, getEmpleadosDepartamento, busquedaEmpleadoDepartamento, getEmpleadoDepartamento, getEmpleadosEmpresa, updateEmpleado, getEmpleado} from '../controllers/empleados';

const router =  Router();
//GET - Todos los empleados
router.get( '/', getEmpleados )
//GET - Todos los empleados de un departamento
router.get('/departamento/:departamentoId', getEmpleadosDepartamento)
//GET - Busqueda empleados de una empresa, departamento y con termino 
router.get('/departamento/busqueda/:empresaId/:termino', getEmpleadosDepartamento)
//GET - Todos los empleados de un departamento
router.get('/:empleadoId', getEmpleado)
//GET - Buscar empeados dentro de un departamento
router.get('/:busqueda/:departamentoId/:busqueda', busquedaEmpleadoDepartamento)
//GET - Obtener empleados empresa
router.get('/empresa/:empresaId', getEmpleadosEmpresa)

//GET - Comprobar empleado existe en una empresa
router.get('/comprobar/empresa/:empresaId/:numeroEmpleado', getEmpleadoDepartamento)
//POST - Crear empleado
router.post( '/', createEmpleado )
//PUT - Actualizar Empleado
router.put('/cambiar-status/:idEmpleado', darDeBajaAlta)
router.put('/:idEmpleado', updateEmpleado)


export default router 