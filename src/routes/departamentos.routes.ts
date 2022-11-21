import { updateDepartamento } from './../controllers/departamentos';
import {Router} from 'express';
import { createArea, getAreas } from '../controllers/areas';
import { createDepartamentos, getDepartamento, getDepartamentoEmpresaId, getDepartamentos } from '../controllers/departamentos';

import {getEmpleados, createEmpleado, darDeBajaAlta, getEmpleadosDepartamento} from '../controllers/empleados';

const router =  Router();

router.get( '/', getDepartamentos )
router.get( '/:idDepartamento', getDepartamento )
router.post( '/', createDepartamentos )
router.put( '/:departamentoId', updateDepartamento )
router.get( '/empresa/:empresaId', getDepartamentoEmpresaId )

 
export default router 