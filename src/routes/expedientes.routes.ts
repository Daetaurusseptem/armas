import { getArea, getAreasEmpresa } from './../controllers/areas';
import {Router} from 'express';
import { createArea, getAreas, updateArea } from '../controllers/areas';

import {getExpedienteEmpleado} from '../controllers/expedientes';

const router =  Router();
//GET - Obtener todas las areas existentes
router.get( '/:empresaId/:areaId/:empleadoId', getExpedienteEmpleado ) 

 
export default router 