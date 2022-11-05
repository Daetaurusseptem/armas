import { getArea, getAreasEmpresa } from './../controllers/areas';
import {Router} from 'express';
import { createArea, getAreas, updateArea } from '../controllers/areas';

import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();
//GET - Obtener todas las areas existentes
router.get( '/', getAreas ) 
//GET - Obtener area por id | params:empresaId
router.get( '/empresa/:empresaId', getAreasEmpresa)     
//GET - Obtener Area por id
router.get( '/:idArea', getArea ) 
//DELETE - Eliminar Permisos de Area de un usuario Indicado
router.delete( '/:idArea', getArea ) 
//POST - Crear una nueva area
router.post( '/', createArea )
//PUT - Actualizar informacion del area
router.put( '/:idArea', updateArea)

 
export default router 