import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { default as UserModel } from "../models/user.model.js";

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already Exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new UserModel({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully!!", newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.log("Error aaya", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials!!" });
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if (!ispasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong Password!!" });
    }

    //****************************************************************
    // create token if user logins in successfully
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Store this token in cookies
    res.cookie("TOKEN", token, {
      httpOnly: true,
      secure: false,
      // "secure: false" It will not work for http. When we host this backend then only make it true otherwise leave it false.

      maxAge: 60 * 60 * 1000, // 1 hour
    });

    //****************************************************************

    res
      .status(200)
      .json({ success: true, message: "Login successfully", user, token });
    //
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server error!!" });
  }
};

const logout = async (req, res) => {
  try {
    // remove the token from cookies
    res.clearCookie("TOKEN");

    res.status(200).json({ message: "User logout successfully" });
    //
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server error!!" });
  }
};

export { login, logout, register };
