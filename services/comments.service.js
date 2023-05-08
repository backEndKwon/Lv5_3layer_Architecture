const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  // 1-댓글생성
  createComments = async (postId, userId, content) => {
    console.log("서비스   " + postId, userId, content);
    const CreateComments = await this.commentRepository.createsComments(
      postId,
      userId,
      content
    );
    return CreateComments;
  };
  findOnePost = async (postId) => {
    const DetailComment = await this.commentRepository.findOnePost(postId);
    return {
      PostId: DetailComment.postId,
      UserId: DetailComment.UserId,
      comment: DetailComment.content,
    };
  };

  /////////////

  // 2-댓글조회
  getComments = async (postId) => {
    const getComment = await this.commentRepository.getComment(postId);
    getComment.sort((a, b) => b.createdAt - a.createdAt);
    const getComments = getComment.map((a) => {
      return {
        postId: a.PostId,
        userId: a.UserId,
        comment: a.comment,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      };
    });
    return getComments;
  };
  /////////////

  // 3-댓글수정
  findOneComment = async (commentId) => {
    const findonecomment = await this.commentRepository.findOneComment(
      commentId
    );
    return {
      commentId: commentId,
    };
  };

  putComment = async (comment, commentId) => {
    const putcomment = await this.commentRepository.putComment(
      commentId,
      comment
    );
    return;
  };
  /////////////

  // 4-댓글삭제
  deleteComment = async (commentId) => {
    await this.commentRepository.deleteComment(commentId);
    return;
  };
  /////////////
}

module.exports = CommentService;
