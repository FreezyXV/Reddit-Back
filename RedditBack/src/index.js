
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authToken from "./middlewares/authToken";
import UserRouter from "./routes/userRoute";
import SubredditRouter from "./routes/subredditRoute";
import PostRouter from "./routes/postRoute";
import CommentRouter from "./routes/commentRoute";

const app = express();
const PORT = process.env.PORT || 9876;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", UserRouter);
app.use("/subreddit", authToken, SubredditRouter);
app.use("/post", authToken, PostRouter);
app.use("/comment", authToken, CommentRouter);

const MONGODB_URI = "mongodb://127.0.0.1:27017/RedditDB";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(`[DATABASE] MongoDB is Connected`))
  .catch((err) => console.error(`[DATABASE] Connection error: ${err}`));

app.get("/", (req, res) => {
  res.send("Welcome to the Reddit APP!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () =>
  console.log(`[SERVER] listening at http://localhost:${PORT}`)
);
