import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middleware/validarCampos';
import { validarJWT, validarADMIN_ROLE } from '../middleware/validar-jwt';
import { createUser, deleteUser, getUser, getUsers, updateUser, writeOrReadPermissions } from '../controllers/user';

const router = Router();

router.get('/', [
    validarJWT,
    validarADMIN_ROLE
], getUsers);
router.get('/:idUsuario', getUser);
router.post('/', [

    check('usuario', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(), validarJWT,
    validarADMIN_ROLE,
    validarCampos,
],

    createUser);
router.put('/:userId', [
    validarJWT,
    validarADMIN_ROLE
], updateUser);
router.delete('/:userId', [
    validarJWT,
    validarADMIN_ROLE
], deleteUser);

// usuario permisos en un area
router.get('/permiso/:areaId/:usuarioId',[validarJWT], writeOrReadPermissions)

export default router  