const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");


const CommentsController = require("../controllers/comments.controller");

const commentsController = new CommentsController();

//댓글 생성
router.post("/:postId/comments", authMiddleware, commentsController.createComment);
// //댓글 조회
// router.get("/:postId/comments", authMiddleware, commentsController.getComment);

// // 댓글 수정
// router.put("/:postId/comments/:commentId", authMiddleware, commentsController.putComment);

// // //게시글 삭제
// router.delete("/:postId/comments/:commentId", authMiddleware, commentsController.deleteComment);

module.exports = router;
