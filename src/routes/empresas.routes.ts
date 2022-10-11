import {Router} from 'express';
import { createEmpresa, getEmpresas } from '../controllers/empresas';


const router =  Router();

router.get( '/', getEmpresas );
router.post( '/', createEmpresa );

export default router