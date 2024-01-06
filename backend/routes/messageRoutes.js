import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/",protectRoute,sendMessage);


export default router;