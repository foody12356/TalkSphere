import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);  //grab user feed grab every single posts 
router.get("/:userId/posts", verifyToken, getUserPosts);  //invlove user id to grab user's post 

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);   //this is for liking and unliking the post 

export default router;
