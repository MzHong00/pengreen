import { Router } from "express";

import {createVote, getMyVote, getVoteOwner, getVote_seqLikes} from '../../services/vote.js'
import {updateChoiceCount, isAlreadyChoice, getChoiceOfVote} from '../../services/choice.js'
import {updateLikesCount, isAlreadyLikes} from '../../services/likes.js'

const router = Router();

router.post('/create', createVote);

router.post('/read-mine', getMyVote);
router.post('/read-owner', getVoteOwner);
router.get('/read-like', getVote_seqLikes);
router.post('/read-choice', getChoiceOfVote);

router.put('/update-like', updateLikesCount);
router.post('/already-like', isAlreadyLikes);
router.put('/update-choice', updateChoiceCount);
router.post('/already-choice', isAlreadyChoice);

// router.put('/update', );
// router.delete('/delete', );

export default router;