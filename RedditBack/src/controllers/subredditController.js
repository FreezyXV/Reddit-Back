import Subreddit from "../models/subredditModel.js";
import Post from "../models/postModel.js";

export const createSubreddit = async (req, res) => {
  try {
    console.log("Request User ID:", req.user._id);
    const { name, description } = req.body;
    const subreddit = new Subreddit({
      name,
      description,
      moderators: [req.user._id],
    });

    await subreddit.save();
    console.log("Subreddit Created:", subreddit);
    res.status(201).json(subreddit);
  } catch (error) {
    console.error("Error Creating Subreddit:", error);
    res.status(500).send(error.message);
  }
};

export const getSubreddit = async (req, res) => {
  try {
    const subredditId = req.params.subredditId;
    const subreddit = await Subreddit.findById(subredditId);

    if (!subreddit) {
      return res.status(404).send("Subreddit not found");
    }

    res.status(200).json(subreddit);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateSubreddit = async (req, res) => {
  try {
    const subredditId = req.params.subredditId;
    const subreddit = await Subreddit.findById(subredditId);

    if (!subreddit) {
      return res.status(404).send("Subreddit not found");
    }

    if (!subreddit.moderators.includes(req.user._id)) {
      return res.status(403).send("Unauthorized to edit this subreddit");
    }

    subreddit.name = req.body.name;
    subreddit.description = req.body.description;
    await subreddit.save();

    res.status(200).json(subreddit);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteSubreddit = async (req, res) => {
    try {
      const subredditId = req.params.subredditId;
      const subreddit = await Subreddit.findOne({
        _id: subredditId,
        moderators: req.user._id,
      });
      if (!subreddit) return res.sendStatus(403);
  
      await Post.deleteMany({ _id: { $in: subreddit.posts } });

      await Subreddit.deleteOne({ _id: subredditId });
  
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

