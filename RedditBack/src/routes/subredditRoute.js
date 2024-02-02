import { Router } from "express";
import {
  createSubreddit,
  getSubreddit,
  updateSubreddit,
  deleteSubreddit,
} from "../controllers/subredditController";

const SubredditRouter = Router();

SubredditRouter.post("/create-subreddit", createSubreddit);
SubredditRouter.get("/get-subreddit/:subredditId", getSubreddit);
SubredditRouter.put("/update-subreddit/:subredditId", updateSubreddit);
SubredditRouter.delete("/delete-subreddit/:subredditId", deleteSubreddit);

export default SubredditRouter;
