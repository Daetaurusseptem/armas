import {Router} from 'express';
import { createEmpresa } from '../controllers/empresas';


const router =  Router();

router.post( '/', createEmpresa );

export default router