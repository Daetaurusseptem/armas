import {Router} from 'express';

import {fileUpload} from '../controllers/uploads';

const router =  Router();

router.post( '/:empresaId/:areaId/:empleadoId', fileUpload );



export default router  