import { getArea, getAreasEmpresa } from './../controllers/areas';
import {Router} from 'express';
import { createArea, getAreas, updateArea } from '../controllers/areas';

import {getExpedienteEmpleado, getTiposExpedientes} from '../controllers/expedientes';

const router =  Router();
//GET - Obtener todas las areas existentes
router.get( '/:empresaId/:areaId/:empleadoId', getExpedienteEmpleado ) 
//GET - Obtener todas las areas existentes en una empresa
router.get( '/tipos/todo/:empresaId/:areaId', getTiposExpedientes ) 

 
export default router 