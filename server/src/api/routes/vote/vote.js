import { Router } from "express";

import { createVote, getMyVote, getVoteById, getVoteOwner, getVote_sortByLikes, getVote_sortByParticipant } from '../../../services/vote.js'
import { updateChoiceCount, getChoiceOfVote, getPick } from '../../../services/choice.js'
import { updateLikesCount, isAlreadyLikes } from '../../../services/likes.js'

const router = Router();

router.post('/create', createVote);

router.post('/read-mine', getMyVote);
router.post('/read-owner', getVoteOwner);
router.get('/read-like', getVote_sortByLikes);
router.get('/read-participant', getVote_sortByParticipant);
router.post('/read-choice', getChoiceOfVote);
router.post('/read-id', getVoteById);

router.put('/update-like', updateLikesCount);
router.post('/already-like', isAlreadyLikes);

router.put('/update-choice', updateChoiceCount);
router.post('/already-choice', getPick);

export default router;