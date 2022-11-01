import {Router} from 'express';

import {getEmpleados, createEmpleado, darDeBajaAlta, getEmpleadosDepartamento, busquedaEmpleadoDepartamento} from '../controllers/empleados';

const router =  Router();
//GET - Todos los empleados
router.get( '/', getEmpleados )
//GET - Todos los empleados de un departamento
router.get('/:departamentoId', getEmpleadosDepartamento)
//GET - Buscar empeados dentro de un departamento
router.get('/:busqueda/:departamentoId/:busqueda', busquedaEmpleadoDepartamento)
//POST - Crear empleado
router.post( '/', createEmpleado )
//PUT - Actualizar Empleado
router.put('/cambiar-status/:idEmpleado', darDeBajaAlta)


export default router 