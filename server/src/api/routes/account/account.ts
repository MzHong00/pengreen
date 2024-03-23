import { Router } from 'express';

import google from './googleOauth/oauth_google'
import { tokenAuth, reissueToken, signin } from '../../../services/auth/auth'

const router = Router();

router.post('/auth', tokenAuth)
router.post('/signin', signin)
router.post('/reissue', reissueToken)

router.use('/google', google)

export default router;