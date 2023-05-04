const CommentRepository = require("../repositories/posts.repository");

class CommentService {
  commentRepository = new CommentRepository();

  createComments = async (postId, userId, content) => {
    const createComments = await this.postRepository.createComments(
      userId,
      postId,
      content
    );
    return createComments;
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
