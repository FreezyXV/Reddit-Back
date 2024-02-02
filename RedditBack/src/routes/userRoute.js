import { Router } from "express";
import {
  registerUser,
  loginUser, logoutUser
} from "../controllers/userController";

const UserRouter = Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/logout", logoutUser);

export default UserRouter;
