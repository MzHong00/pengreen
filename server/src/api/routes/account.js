import { Router } from 'express';

import { getUserInfo, signin, signout } from "../../services/account.js"

const router = Router();

router.get('/signin', signin);
router.get('/signout', signout);
router.post('/userinfo', getUserInfo)

export default router;