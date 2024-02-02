import { Router } from "express";
import {
  createComment,
  editComment,
  deleteComment,
  getComment,
} from "../controllers/commentController";

const CommentRouter = Router();

CommentRouter.post("/create-comment/:postId", createComment);
CommentRouter.put("/edit-comment/:commentId", editComment);
CommentRouter.delete("/delete-comment/:commentId", deleteComment);
CommentRouter.get("/:commentId", getComment);

export default CommentRouter;
