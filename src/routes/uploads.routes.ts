import {Router} from 'express';

import {subirArchivo} from '../controllers/uploads';

const router =  Router();

router.post( '/:empresaId/:areaId/:empleadoId', subirArchivo );



export default router  