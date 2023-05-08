const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

//게시글 생성
router.post("/posts", authMiddleware, postsController.createPost);
//게시글 조회
router.get("/posts", postsController.getPost);
//게시글 상세조회
router.get("/posts/:postId", postsController.getDetailPost);
//게시글 수정
router.put("/posts/:postId", authMiddleware, postsController.putPost);
//게시글 삭제
router.delete("/posts/:postId", authMiddleware, postsController.deletePost);


module.exports = router;
