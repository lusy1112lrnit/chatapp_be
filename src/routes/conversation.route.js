import express from "express";
import trimRequest from "trim-request";
import authMiddleware from "../middlewares/authMiddleware.js";
import{ create_open_conversation, getConversations, createGroup, update, adduser, remove } from "../controllers/conversation.controller.js";
import { updateLatestMessage } from "../services/conversation.service.js";

const router = express.Router();

router.route("/").post(trimRequest.all, authMiddleware, create_open_conversation);
router.route("/").get(trimRequest.all, authMiddleware, getConversations);
router.route("/group").post(trimRequest.all, authMiddleware, createGroup);
router.route("/update").post(trimRequest.all, authMiddleware, update);
router.route("/adduser").post(trimRequest.all, authMiddleware, adduser);
router.route("/remove").post(trimRequest.all, authMiddleware, remove);


export default router; 