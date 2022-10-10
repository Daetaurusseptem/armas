import {Router} from 'express';
import { createArea, getAreas } from '../controllers/areas';

import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();

router.get( '/', getAreas )
router.post( '/', createArea )

 
export default router 