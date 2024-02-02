###

Tools:

backpack-core
jsonwebtoken
mongoose
express
dotenv
bcrypt
cors

###

Structure:

src/
┣ controllers/
┃ ┣ commentController.js
┃ ┣ postController.js
┃ ┣ subredditController.js
┃ ┗ userController.js
┣ middlewares/
┃ ┗ authToken.js
┣ models/
┃ ┣ commentModel.js
┃ ┣ postModel.js
┃ ┣ subredditModel.js
┃ ┗ userModel.js
┣ routes/
┃ ┣ commentRoute.js
┃ ┣ postRoute.js
┃ ┣ subredditRoute.js
┃ ┗ userRoute.js
┣ REDDIT.REST
┣ index.js

###

.REST requests :

User Registration
User Login
User Logout

Create Post (Auth)
Put Post (Auth)
Get All Posts
Get Post by ID
Delete Post (Auth)

Create Subreddit (Auth)
Get Subreddit
Put Subreddit (Auth)
Delete Subreddit (Auth)

Create Comment (Auth)
Get Comment
Put Comment (Auth)
Delete Comment (Auth)
