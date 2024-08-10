import { Router } from "express";

import {
  createVote,
  readChoiceCount,
  readUserPick,
  readVote,
  readVoteById,
  readVoteByOwnerId,
  updateChoice,
  updateLike,
} from "../../../services/vote";

const route = Router();

export default (app: Router) => {
  app.use("/vote", route);

  route.post("/create", async (req, res) => {
    const formData = req.body;

    if (!formData) return res.status(400).send("Form data is missing");

    await createVote(formData);
    res.status(201).send("Create successful");
  });

  route.post("/read", async (req, res) => {
    const page = parseInt(req.body.page as string) - 1;
    const votePerPage = req.body.votePerPage === 0 ? 1 : req.body.votePerPage;
    const category = req.query.category as string;
    const sort = req.query.sort as string;
    
    if (page < 0) {
      res.status(206).send([]);
      return;
    }

    const votes = await readVote(page, votePerPage, category, sort);
    res.status(206).send(votes);
  });

  route.post("/read-id", async (req, res) => {
    const { voteId } = req.body;

    if (!voteId) return res.status(400).send("voteId is missing");

    const votes = await readVoteById(voteId);
    res.status(206).send(votes);
  });

  route.post("/read-owner", (req, res) => {
    const { own_id } = req.body;

    if (!own_id) return res.status(400).send("ownerId is missing");

    const votes = readVoteByOwnerId(own_id);
    res.status(206).send(votes);
  });

  route.put("/read-choice-count", async (req, res) => {
    const { vote_id, choiceList } = req.body;

    if (!vote_id) return res.status(400).send("voteId is missing");

    const choicesCount = await readChoiceCount(vote_id, choiceList);
    res.send(choicesCount);
  });

  route.put("/read-mypick", async (req, res) => {
    const { user_id, vote_id } = req.body;

    if (!vote_id || !user_id)
      return res.status(400).send("voteId or userId is missing");

    const userPick = await readUserPick(user_id, vote_id);
    res.status(206).send(userPick);
  });

  route.post("/update-choice", async (req, res) => {
    const { user_id, vote_id, choiceList } = req.body;

    await updateChoice(user_id, vote_id, choiceList);
    res.status(200).send("Update Choice successful");
  });

  route.put("/update-like", async (req, res) => {
    const { user_id, vote_id } = req.body;

    await updateLike(user_id, vote_id);
    res.status(200).send("Update Like successful");
  });
};