import { getEmpresa, updateEmpresa, createEmpresa, getEmpresas, deleteEmpresa  } from './../controllers/empresas';
import {Router} from 'express';

import {validarADMIN_ROLE,validarJWT} from '../middleware/validar-jwt';


const router =  Router();

router.get( '/',[
    validarJWT
], getEmpresas );
router.delete( '/:idEmpresa',[
    validarJWT
], deleteEmpresa )
router.get( '/:idEmpresa',[
    validarJWT,
], getEmpresa );
router.post( '/',[
    validarJWT,
    validarADMIN_ROLE
], createEmpresa );
router.put( '/:idEmpresa',[
    validarJWT,
    validarADMIN_ROLE
], updateEmpresa );

export default router