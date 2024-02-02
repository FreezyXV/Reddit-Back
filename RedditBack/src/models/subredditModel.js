import mongoose from "mongoose";

const subredditSchema = new mongoose.Schema({
  name: String,
  description: String,
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const Subreddit = mongoose.model("Subreddit", subredditSchema);

export default Subreddit;
