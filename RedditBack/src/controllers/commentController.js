import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const comment = new Comment({
      content,
      user: req.user.id,
      post: postId,
    });

    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findById(commentId).populate("user");

    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    if (!comment.user) {
      console.error("User data not populated for comment:", comment);
      return res.status(404).send("User not found for comparison");
    }

    if (req.user.id.toString() === comment.user.id.toString()) {
      comment.content = content;
      await comment.save();
      res.status(200).json(comment);
    } else {
      return res.status(403).send("Unauthorized to edit this comment");
    }
  } catch (error) {
    console.error("Error in editComment:", error);
    res.status(500).send(error.message);
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id.toString()) {
      return res.status(403).send("Unauthorized to delete this comment");
    }

    await Comment.deleteOne({ _id: commentId }); 
    res.status(200).send("Comment deleted");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId).populate(
      "user",
      "username"
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
