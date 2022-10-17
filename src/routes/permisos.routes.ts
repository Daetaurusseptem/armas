import {Router} from 'express';
import {agregarPermiso} from '../controllers/permisos';

import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();
//POST - Crear Prmiso para cierta area
router.post( '/:idUsuario/:idArea/:tipo', agregarPermiso )

 
export default router 