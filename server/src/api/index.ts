import { Router } from "express";

import account from "./routes/account/account";
import vote from './routes/vote/vote';

const router = Router();

router.use('/account', account);
router.use('/vote', vote)

export default router;