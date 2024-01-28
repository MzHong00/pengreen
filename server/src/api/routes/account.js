import { Router } from 'express';

import google from './oauth_google.js'
import { auth, reissue_token, signin } from '../../services/auth.js'

const router = Router();

router.post('/auth', auth)
router.post('/signin', signin)
router.post('/reissue', reissue_token)
router.use('/google', google)

export default router;