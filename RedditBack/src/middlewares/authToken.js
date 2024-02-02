import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1]; 
  
      console.log("JWT Token:", token);
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log("Token verification error:", err.message); 
          return res.sendStatus(403); 
        }
  
        console.log("Decoded User:", decoded);
  
        req.user = { id: decoded.user }; 
        next();
      });
    } else {
      res.sendStatus(401); 
    }
  };

export default authToken;