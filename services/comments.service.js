const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

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
}

module.exports = CommentService;
