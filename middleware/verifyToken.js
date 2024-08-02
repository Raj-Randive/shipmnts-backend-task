import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.TOKEN;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: User is not an admin" });
    }

    req.user = user;

    next();

    console.log(user);

    // console.log(token);
    // console.log(decoded);

    //
  } catch (error) {
    console.log(error);
  }
};

export { isAdmin };
