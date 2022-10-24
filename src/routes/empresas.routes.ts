import { getEmpresa } from './../controllers/empresas';
import {Router} from 'express';
import { createEmpresa, getEmpresas } from '../controllers/empresas';


const router =  Router();

router.get( '/', getEmpresas );
router.get( '/:idEmpresa', getEmpresa );
router.post( '/', createEmpresa );

export default router