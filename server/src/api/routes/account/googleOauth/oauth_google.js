import { Router } from 'express';

import { google_redirect , google_signin, google_signout } from "../../../../services/google_oauth.js"

const router = Router();

router.get('/signin', google_signin);
router.get('/signout', google_signout);
router.post('/redirect', google_redirect)

export default router;