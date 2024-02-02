import Post from '../models/postModel.js';
import Subreddit from '../models/subredditModel.js';
import Comment from '../models/commentModel.js';


export const getPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId).populate('user', 'username');
  
      if (!post) {
        return res.status(404).send('Post not found');
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'username')

        if (!posts.length) {
            return res.status(404).send('No posts found.');
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const createSubredditPost = async (req, res) => {
    try {
      const subredditId = req.params.subredditId;
      const subreddit = await Subreddit.findById(subredditId);
      if (!subreddit) return res.status(404).send("Subreddit not found");
  
      const { title, content } = req.body;
      const post = new Post({ title, content, user: req.user._id });
      await post.save();
  
      subreddit.posts.push(post._id);
      await subreddit.save();
  
      res.status(201).json(post);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  export const editPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findOne({ _id: postId, user: req.user._id });
      if (!post) return res.sendStatus(403);
  
      post.title = req.body.title;
      post.content = req.body.content;
      await post.save();
  
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
};

export const deletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findOne({ _id: postId, user: req.user._id });
      if (!post) return res.sendStatus(403);
  
      await Comment.deleteMany({ post: postId });
      await Post.deleteOne({ _id: postId }); // Use deleteOne to delete the post
  
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

