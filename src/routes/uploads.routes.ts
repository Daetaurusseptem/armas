import {Router} from 'express';

import {subirArchivo} from '../controllers/uploads';

const router =  Router();

router.post( '/:empresaId/:areaId/:departamentoId/:empleadoId', subirArchivo );



export default router  