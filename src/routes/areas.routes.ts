import {Router} from 'express';
import { createArea, getAreas, updateArea } from '../controllers/areas';

import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();
//GET - Obtener todas las areas existentes
router.get( '/', getAreas )
//POST - Crear una nueva area
router.post( '/', createArea )
//PUT - Actualizar informacion del area
router.put( '/', updateArea)

 
export default router 