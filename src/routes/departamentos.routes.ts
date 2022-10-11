import {Router} from 'express';
import { createArea, getAreas } from '../controllers/areas';
import { createDepartamentos, getDepartamentos } from '../controllers/departamentos';

import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();

router.get( '/', getDepartamentos )
router.post( '/', createDepartamentos )

 
export default router 