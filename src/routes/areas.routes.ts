import { getArea } from './../controllers/areas';
import {Router} from 'express';
import { createArea, getAreas, updateArea } from '../controllers/areas';

import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();
//GET - Obtener todas las areas existentes
router.get( '/', getAreas ) 
//GET - Obtener Area por id
router.get( '/:idArea/:usuarioId', getArea ) 
//DELETE - Eliminar Permisos de Area de un usuario Indicado
router.delete( '/:idArea', getArea ) 
//POST - Crear una nueva area
router.post( '/', createArea )
//PUT - Actualizar informacion del area
router.put( '/', updateArea)

 
export default router 