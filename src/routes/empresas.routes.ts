import { getEmpresa, updateEmpresa, createEmpresa, getEmpresas  } from './../controllers/empresas';
import {Router} from 'express';


const router =  Router();

router.get( '/', getEmpresas );
router.get( '/:idEmpresa', getEmpresa );
router.post( '/', createEmpresa );
router.put( '/:idEmpresa', updateEmpresa );

export default router