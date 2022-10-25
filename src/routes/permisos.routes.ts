import {Router} from 'express';
import {agregarEliminarPermiso} from '../controllers/permisos';

import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();
//POST - Crear Prmiso para cierta area
router.post( '/:idUsuario/:idArea/:tipo', agregarEliminarPermiso )

 
export default router 