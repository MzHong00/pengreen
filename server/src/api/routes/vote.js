import { Router } from "express";

import { createVote, getMyVote, isAlreadyLikes, updateLikesCount } from "../../services/vote.js";

const router = Router();

router.post('/create', createVote);
router.post('/read-mine', getMyVote);

router.put('/update-like', updateLikesCount);
router.post('/already-like', isAlreadyLikes);

// router.put('/update', );
// router.delete('/delete', );

export default router;