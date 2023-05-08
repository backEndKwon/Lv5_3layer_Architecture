const { Comments, Posts } = require("../models");

class CommentRepository {
  // 1-댓글생성
  createsComments = async (postId, userId, content) => {
    const createComments = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment: content,
    });
    console.log("레퍼지토리 : :" + createComments);
    return createComments;
  };
  /////////////

  // 2-댓글조회
  findOnePost = async (postId) => {
    const DetailComments = await Posts.findByPk(postId);
    return DetailComments;
  };
  getComment = async (postId) => {
    const comments = await Comments.findAll({ where: { PostId: postId } });

    return comments;
  };
  /////////////

  // 3-댓글수정
  putComment = async (comment, commentId) => {
    const putcomment = await Comments.update(
      { comment },
      { where: { commentId } }
    );
    return putcomment;
  };
  findOneComment = async (commentId) => {
    const comments = await Comments.findAll({
      where: { commentId: commentId },
    });
    return comments
  }
    /////////////

  // 4-댓글삭제
deleteComment = async (commentId) =>{
  const deletecomment = await Comments.findByPk(commentId)
  await deletecomment.destroy()
  }
  /////////////

}

module.exports = CommentRepository;
