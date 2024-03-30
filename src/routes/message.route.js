import express from "express";
import trimRequest from "trim-request";
import authMiddleware  from "../middlewares/authMiddleware.js"
import {sendMessage, getMessages, updateMessage} from "../controllers/message.controller.js"
const router = express.Router();

router.route("/").post(trimRequest.all, authMiddleware, sendMessage);
router.route("/:convo_id").get(trimRequest.all, authMiddleware, getMessages);
router.route("/update").post(trimRequest.all, updateMessage);




export default  router;

