import express from "express";
import { verify } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsers,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", verify, getUsers);
router.get("/:id", verify, getMessages);

router.post("/send/:id", verify, sendMessage);

export default router;
