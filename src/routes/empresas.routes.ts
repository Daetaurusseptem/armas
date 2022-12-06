import { getEmpresa, updateEmpresa, createEmpresa, getEmpresas  } from './../controllers/empresas';
import {Router} from 'express';

import {validarADMIN_ROLE,validarJWT} from '../middleware/validar-jwt';


const router =  Router();

router.get( '/',[
    validarJWT
], getEmpresas );
router.get( '/:idEmpresa',[
    validarJWT,
], getEmpresa );
router.post( '/',[
    validarJWT,
    validarADMIN_ROLE
], createEmpresa );
router.put( '/:idEmpresa',[
    validarJWT,
], updateEmpresa );

export default router