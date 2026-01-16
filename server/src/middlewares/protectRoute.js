import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
            return res.json({ success: false, message: "JWT must be provided" });
        }
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
     const userId = decoded.userId || decoded.id;
    if (!userId) {
         return res.json({ success: false, message: "Invalid token: user ID missing" });
      }
      const user = await User.findById(userId).select("-password");

    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const isAdminRoute = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.json({ success: false, message: "Admin access required" });
    }
    next();
}

// const isAdminRoute = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     return res.status(401).json({
//       status: false,
//       message: "Not authorized as admin. Try login as admin.",
//     });
//   }
// };

export {protectRoute, isAdminRoute};
