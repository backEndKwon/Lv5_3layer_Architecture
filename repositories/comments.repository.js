const { Comments, Posts } = require("../models");

class CommentRepository {
  // 1) 댓글 등록
  createComments = async (postId, userId, content) => {
    const createComments = await Comments.create({
      UserId : userId,
      PostId : postId,
      comment : content,
    });
    console.log(createComments)
    return createComments;
  };

  findOnePost = async (postId) => {
    const DetailComments = await Posts.findByPk(postId);
    return DetailComments;
  };

}

module.exports = CommentRepository;
