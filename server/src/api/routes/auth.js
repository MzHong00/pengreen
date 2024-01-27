import { Router } from 'express';

import { auth } from '../../services/auth.js'

const router = Router();

router.post('/google', auth);

export default router;