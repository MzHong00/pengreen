import { Router } from "express";

import { createVote } from "../../../services/vote/createVote";
import {
  readVote,
  readVoteByOwnerId,
  readVoteById,
} from "../../../services/vote/readVote";
import { updateLike } from "../../../services/vote/updateLikes";
import { readChoiceCount, readUserPick } from "../../../services/vote/readChoice";
import { updateChoice } from "../../../services/vote/updateChoice";

const router = Router();

router.post("/create", createVote);
router.post("/read", readVote);
router.post("/read-id", readVoteById);
router.post("/read-owner", readVoteByOwnerId);

router.put("/update-like", updateLike);

router.put("/read-choice-count", readChoiceCount);
router.put("/read-mypick", readUserPick);
router.post("/update-choice", updateChoice);

export default router;
