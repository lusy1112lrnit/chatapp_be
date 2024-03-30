import express from "express";
import { seachUsers } from "../controllers/user.controller.js";
import trimRequest from "trim-request";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(trimRequest.all, authMiddleware, seachUsers);

export default router;
