import {Router} from 'express';

import {getEmpleados} from '../controllers/empleados';

const router =  Router();

router.get( '/', getEmpleados )

export default router 