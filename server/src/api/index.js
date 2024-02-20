import { Router } from "express";

import account from "./routes/account.js";
import vote from './routes/vote.js';

const router = Router();

router.use('/account', account);
router.use('/vote', vote)

export default router;