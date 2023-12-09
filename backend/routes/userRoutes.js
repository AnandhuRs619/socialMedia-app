import  express  from "express";
import { signupUser } from "../controllers/userController.js";


const router = express.Router();

router.get("/signup",signupUser)

export default router;