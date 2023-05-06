//상위계층
const CommentService = require("../services/comments.service");
const { Comments } = require("../models");

class CommentsController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { content } = req.body;
    console.log(userId);
    console.log(postId);
    console.log(content);
    try {
      //게시글 존재 확인
      const checkPost = await this.commentService.findOnePost(postId);
      if (!checkPost) {
        return res.status(412).json({ errorMessage: "게시글 없음" });
      }

      await this.commentService.createComment(postId, userId, content);
      return res.status(201).json({ message: "댓글 작성 성공" });
    } catch (err) {
      return res.status(400).json({ errorMessage: "댓글 작성 실패" });
    }
  };
}

module.exports = CommentsController;
