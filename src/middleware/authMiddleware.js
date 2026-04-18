import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // 1️ Extract token
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    // 2️ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️ Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4️ Attach user to request
    req.user = user;

    // 5️ Call next
    next();

  } catch (error) {
    // 6️ Invalid token
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;