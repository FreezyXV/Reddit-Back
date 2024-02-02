import { Router } from "express";
import { createSubredditPost, getPost, editPost, deletePost, getAllPosts} from "../controllers/postController";

const PostRouter = Router();

PostRouter.post("/create-post/:subredditId", createSubredditPost);
PostRouter.get("/get-post/:postId", getPost);
PostRouter.get("/get-all-posts", getAllPosts);
PostRouter.put("/edit-post/:postId", editPost);
PostRouter.delete("/delete-post/:postId", deletePost);

export default PostRouter;
