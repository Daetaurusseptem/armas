import {Router} from 'express';

import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();

router.get( '/', getEmpleados )
router.post( '/', createEmpleado )
router.put('/cambiar-status/:idEmpleado', darDeBajaAlta)


export default router 