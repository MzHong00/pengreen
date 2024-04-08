import { Router } from "express";

import account from "./routes/account/account";
import vote from './routes/vote/vote';
import { google_signin } from "@/services/auth/google_oauth";

const router = Router();

router.get('/' ,google_signin);
router.use('/account', account);
router.use('/vote', vote)

export default router;