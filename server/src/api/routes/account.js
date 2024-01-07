import { Router } from 'express';

import { register } from "../../services/account.js"

const router = Router();

router.post('/register', register);

router.post('/signin', (req, res) => {
    res.status(200).send("SignIn");
})

export default router;