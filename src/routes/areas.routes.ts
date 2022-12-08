import { eliminarArea, getArea, getAreasEmpresa } from './../controllers/areas';
import {Router} from 'express';
import { createArea, getAreas, updateArea } from '../controllers/areas';
import {validarADMIN_ROLE,validarJWT} from '../middleware/validar-jwt';
import {getEmpleados, createEmpleado, darDeBajaAlta} from '../controllers/empleados';

const router =  Router();
//GET - Obtener todas las areas existentes
router.get( '/',[
    validarJWT
], getAreas ) 
//GET - Obtener area por id | params:empresaId
router.get( '/empresa/:empresaId', [
    validarJWT
],getAreasEmpresa)     
//GET - Obtener Area por id
router.get( '/:idArea',[
    validarJWT
], getArea ) 
//DELETE - Eliminar Area
router.delete( '/:idArea',[
    validarJWT,
    validarADMIN_ROLE
], eliminarArea ) 
//POST - Crear una nueva area
router.post( '/',[
    validarJWT,
    validarADMIN_ROLE
], createArea )
//PUT - Actualizar informacion del area
router.put( '/:idArea',[
    validarJWT,
    validarADMIN_ROLE
], updateArea)

 
export default router 