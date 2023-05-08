const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

const LikesController = require("../controllers/likes.controller");
const likesController = new LikesController()

//게시물 좋아요 누르기
router.put("/posts/:postId/likes", authMiddleware, likesController.putLikes);
//게시물 좋아요 조회
// router.put("/:postId/likes", authMiddleware, likesController.getLikesPost);

module.exports = router;
