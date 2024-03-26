import { Router } from "express";

import { createVote, readVoteByOwnerId, readVoteParticipants, readVoteSortedLikes, readVoteSortedParticipants } from "../../../services/vote";
import { updateLikeInfo, readLikeInfo } from '../../../services/likes'
import { readEachChoiceCount, readIsParticipant, updateChoice } from "../../../services/choice";


const router = Router();

router.post('/create', createVote);
router.post('/read-owner', readVoteByOwnerId);
router.post('/read-participant', readVoteParticipants);
router.get('/read-sorted-like', readVoteSortedLikes);
router.get('/read-sorted-participant', readVoteSortedParticipants);

router.put('/update-like', updateLikeInfo);
router.post('/read-like', readLikeInfo);

router.put('/read-choice-count', readEachChoiceCount);
router.put('/read-isparticipant', readIsParticipant);
router.post('/update-choice', updateChoice);

export default router;