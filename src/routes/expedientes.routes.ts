import { getArea, getAreasEmpresa } from './../controllers/areas';
import {Router} from 'express';
import { createArea, getAreas, updateArea } from '../controllers/areas';

import {crearTipoExpedienteArea, getExpedienteEmpleado, getTiposExpedientesArea} from '../controllers/expedientes';

const router =  Router();
//*GET - Obtener todas las areas existentes
router.get( '/:empresaId/:areaId/:empleadoId', getExpedienteEmpleado ) 
//*GET - Obtener todos los tipos de expedientes de un area existentes en una empresa
router.get( '/tipos/todo/:empresaId/:areaId', getTiposExpedientesArea ) 
//*POST - Crear Tipo de Expediente de Area
router.post('/tipos/todo/crear-tipo/:empresaId/:areaId', crearTipoExpedienteArea )

 
export default router 