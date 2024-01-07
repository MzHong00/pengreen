import { Router } from "express";
import account from "./routes/account.js"

const router = Router();

router.use('/account', account);

export default router;