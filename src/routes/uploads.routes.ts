import {Router} from 'express';

import {subirArchivo, subirImg} from '../controllers/uploads';

const router =  Router();

router.post( '/:empresaId/:areaId/:departamentoId/:empleadoId', subirArchivo );
router.put( '/img/:empresaId/:empleadoId/:empNum', subirImg );



export default router  