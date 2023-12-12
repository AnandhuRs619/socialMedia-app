import  express  from "express";
import { createPost, deletePost, getFeedPosts, getPost, likeUnlikepost, replyToPost } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";


 
const router = express.Router();


router.get("/feed",protectRoute,getFeedPosts);
router.get("/:id",getPost);
router.post("/create",protectRoute,createPost);
router.delete("/:id",protectRoute,deletePost);
router.post("/like/:id",protectRoute,likeUnlikepost);
router.post("/reply/:id",protectRoute,replyToPost);

export default router;