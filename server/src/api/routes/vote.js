import { Router } from "express";

import { createVote, getMyVote } from "../../services/vote.js";

const router = Router();

router.post('/create', createVote);
router.post('/read-mine', getMyVote);

// router.put('/update', );
// router.delete('/delete', );

export default router;