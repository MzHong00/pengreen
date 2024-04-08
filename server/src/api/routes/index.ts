import { Router } from "express";

import account from "./account/account";
import vote from './vote/vote';

const router = Router();

router.use('/account', account);
router.use('/vote', vote)

export default router;