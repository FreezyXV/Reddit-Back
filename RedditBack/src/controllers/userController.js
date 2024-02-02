import dotenv from "dotenv";
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const registerUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username is already taken." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
  
      res.status(201).send("User registered successfully.");
    } catch (error) {
      res.status(500).json({ message: "An error occurred during registration.", error: error.message });
    }
  };

  
  export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).send("Username and password are required.");
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).send("User not found");
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).send("Incorrect password");
      }
  
      // const token = jwt.sign({ user: user._id }, "qazwsxedcrfvtgbyhnujm", { expiresIn: "7d" });

      const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during login.", error: error.message });
    }
  };


export const logoutUser = async (req, res) => {
  console.log("User logged out");

  res.status(200).json({ message: "Successfully logged out." });
};


export default {
  registerUser,
  loginUser
};
