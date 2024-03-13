import { Router } from "express";

import account from "./routes/account/account.ts";
import vote from './routes/vote/vote.js';

const router = Router();

router.use('/account', account);
router.use('/vote', vote)

export default router;