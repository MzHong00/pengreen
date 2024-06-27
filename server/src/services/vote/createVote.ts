import { type Vote } from "../../models/vote";
import { mongodbInsert } from "../../loaders/mongodb";

export const createVote = async (req: Request) => {
  const data = req.body;
  const collection = "vote";

  console.log(data);
  
  try {
    //mongodbInsert<Vote>(collection, vote);
  } catch (error) {
    throw error;
  }
};
