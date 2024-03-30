import express from "express";
import authRoutes from "./auth.route.js";
import ConversationRoutes from "./conversation.route.js"
import MessaegRoutes from "./message.route.js"
import userROtes from "./user.route.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userROtes);
router.use("/conversation", ConversationRoutes);
router.use("/message", MessaegRoutes);

export default router;