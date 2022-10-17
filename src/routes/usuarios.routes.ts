import {Router} from 'express';

import {createUser, getUsers, login} from '../controllers/user';

const router =  Router();

router.get( '/', getUsers );
router.post( '/', createUser );


export default router 