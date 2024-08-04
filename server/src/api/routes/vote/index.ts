import { Router } from "express";

import { createVote } from "../../../services/vote/createVote";
import {
  readVote,
  readVoteByOwnerId,
  readVoteById,
} from "../../../services/vote/readVote";
import { updateLike } from "../../../services/vote/updateLikes";
import {
  readChoiceCount,
  readUserPick,
} from "../../../services/vote/readChoice";
import { updateChoice } from "../../../services/vote/updateChoice";

const route = Router();

export default (app: Router) => {
  app.use("/vote", route);

  route.post("/create", createVote);
  route.post("/read", readVote);
  route.post("/read-id", readVoteById);
  route.post("/read-owner", readVoteByOwnerId);

  route.put("/update-like", updateLike);

  route.put("/read-choice-count", readChoiceCount);
  route.put("/read-mypick", readUserPick);
  route.post("/update-choice", updateChoice);
};
