import { Router } from "express";

import { createVote, readVoteList, readVoteByOwnerId, readVoteParticipants, readVoteById } from "../../../services/vote";
import { updateLikeInfo, readLikeInfo } from '../../../services/likes'
import { readEachChoiceCount, readMyPick, updateChoice } from "../../../services/choice";


const router = Router();

router.post('/create', createVote);
router.get('/read', readVoteList);
router.post('/read-id', readVoteById);
router.post('/read-owner', readVoteByOwnerId);
router.post('/read-participant', readVoteParticipants);

router.put('/update-like', updateLikeInfo);
router.post('/read-like', readLikeInfo);

router.put('/read-choice-count', readEachChoiceCount);
router.put('/read-mypick', readMyPick);
router.post('/update-choice', updateChoice);

export default router;