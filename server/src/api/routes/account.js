import { Router } from 'express';

import google from './oauth_google.js'
import auth from './auth.js'

const router = Router();

router.use('/auth', auth)
router.use('/google', google)

export default router;