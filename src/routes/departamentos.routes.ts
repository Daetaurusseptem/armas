import { deleteDepartamento, updateDepartamento } from './../controllers/departamentos';
import {Router} from 'express';
import { createArea, getAreas } from '../controllers/areas';
import { createDepartamentos, getDepartamento, getDepartamentoEmpresaId, getDepartamentos } from '../controllers/departamentos';

import {getEmpleados, createEmpleado, darDeBajaAlta, getEmpleadosDepartamento} from '../controllers/empleados';
import { validarJWT } from '../middleware/validar-jwt';

const router =  Router();

router.get( '/',[
    validarJWT
], getDepartamentos )
router.get( '/:idDepartamento',[
    validarJWT
], getDepartamento )
router.delete( '/:idDepartamento',[
    validarJWT
], deleteDepartamento )
router.post( '/',[
    validarJWT
], createDepartamentos )
router.put( '/:departamentoId',[
    validarJWT
], updateDepartamento )
router.get( '/empresa/:empresaId',[
    validarJWT
], getDepartamentoEmpresaId )

 
export default router 