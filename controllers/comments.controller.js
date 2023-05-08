//상위계층
const CommentService = require("../services/comments.service");
const { Comments } = require("../models");

class CommentsController {
  commentService = new CommentService();
  // 1-댓글생성
  createComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { content } = req.body;
    try {
      //게시글 존재 확인
      const checkPost = await this.commentService.findOnePost(postId);
      if (!checkPost) {
        return res.status(412).json({ errorMessage: "게시글 없음" });
      }

      await this.commentService.createComments(postId, userId, content);
      return res.status(201).json({ message: "댓글 작성 성공" });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "댓글 작성 실패" });
    }
  };
  /////////////

  // 2-댓글조회
  getComment = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const getComment = await this.commentService.getComments(postId);
      console.log(getComment);
      return res.status(200).json({ data: getComment });
    } catch (err) {
      console.error(err);
      return res.status(412).json({ errorMessage: "조회 할 댓글 없음" });
    }
  };
  /////////////

  // 3-댓글수정
  putComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { comment } = req.body;
    try {
      //해당 게시물이 없을 경우(게시물 주인이 삭제 했을 수도 있으니까)
      const checkPost = await this.commentService.findOnePost(postId);
      if (!checkPost) {
        return res.status(412).json({ errorMessage: "수정할 게시글 없음" });
      }

      //해당 댓글이 없을 경우
      const checkComment = await this.commentService.findOneComment(commentId);
      if (!checkComment) {
        return res.status(400).json({ errorMessage: "수정할 댓글 없음" });
      }

      const putcomment = await this.commentService.putComment(
        commentId,
        comment
      );
      return res.status(200).json({ message: "댓글 수정됨" });
    } catch (err) {
      console.error(err);
      return res.status(412).json({ errorMessage: "관리자에게 문의바람" });
    }
  };
  /////////////

  // 4-댓글삭제
  deleteComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
     try {
      //이미 게시물 삭제되었을 경우
      if(!postId){
        return res.status(200).json({ errorMessage: "삭제할 댓글의 게시물이 없음" });  
      }
      const deletecomment = await this.commentService.deleteComment(commentId);
      return res.status(200).json({ message: "댓글 삭제됨" });
    } catch (err) {
      console.error(`control / 삭제 / 에러메세지`, err);
      return res.status(412).json({ errorMessage: "관리자에게 문의바람" });

    }
  };
}

module.exports = CommentsController;
