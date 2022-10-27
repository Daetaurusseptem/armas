import {Router} from 'express';

import {createUser, getUser, getUsers, updateUser} from '../controllers/user';

const router =  Router();

router.get( '/', getUsers );
router.get( '/:idUsuario', getUser);
router.post( '/', createUser );
router.put( '/:userId', updateUser);


export default router  