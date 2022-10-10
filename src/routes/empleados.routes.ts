import {Router} from 'express';

import {getEmpleados, createEmpleado} from '../controllers/empleados';

const router =  Router();

router.get( '/', getEmpleados )
router.post( '/', createEmpleado )

export default router 