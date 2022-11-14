import {Router} from 'express';
console.log('cargada permisos');
import {agregarEliminarPermiso} from '../controllers/permisos';

import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();
//POST - Crear Prmiso para cierta area
router.post( '/:idUsuario/:idArea/:tipo', agregarEliminarPermiso )

 
export default router 