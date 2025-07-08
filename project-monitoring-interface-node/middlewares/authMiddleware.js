import dotenv from "dotenv";
import jwt from "jsonwebtoken"

dotenv.config()

const isAuthenticated = (req, res, next) => {
  try {
      if(!req.cookies.token) {
          return res.status(401).json({error: "Unauthorized Access!"});
      };

    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({error: "Unauthorized Access!"});
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {isAuthenticated};