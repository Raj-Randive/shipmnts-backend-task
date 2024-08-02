import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.post("/logout", logout);

export default AuthRoutes;
