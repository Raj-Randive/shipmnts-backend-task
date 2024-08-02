import { Router } from "express";
import {
  cancelEmail,
  getEmail,
  getEmails,
  scheduleEmail,
} from "../controllers/email.controller.js";
const emailRoutes = Router();

emailRoutes.post("/schedule-email", scheduleEmail);
emailRoutes.get("/scheduled-emails", getEmails);
emailRoutes.get("/scheduled-emails/:id", getEmail);
emailRoutes.delete("/scheduled-emails/:id", cancelEmail);

export default emailRoutes;
