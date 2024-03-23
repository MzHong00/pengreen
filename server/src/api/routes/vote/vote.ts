import { Router } from "express";

import { createVote, readVoteByOwnerId, readVoteSortedLikes, readVoteSortedParticipants } from "../../../services/vote";
import { updateLikeInfo, readLikeInfo } from '../../../services/likes'


import { updateChoiceCount, getChoiceOfVote, getPick } from '../../../services/choice'

const router = Router();

router.post('/create', createVote);
router.post('/read-owner', readVoteByOwnerId);
router.get('/read-like', readVoteSortedLikes);
router.get('/read-participant', readVoteSortedParticipants);

router.put('/like-update', updateLikeInfo);
router.post('/like', readLikeInfo);


router.put('/update-choice', updateChoiceCount);
router.post('/already-choice', getPick);

export default router;