const { Likes, Posts } = require("../models");
const { Op } = require("sequelize");
class LikeRepository {
  // 6) 게시물 좋아요 누르기
  // 6-0) 있는 게시물인지 확인
  checkLikePost = async (postId) => {
    const checkLikePost = await Posts.findByPk(postId);
    return checkLikePost;
  };

  // 6-1-2) like 고유번호 세팅단계
  checkLikeOne = async (userId, postId) => {
    
    const checkLikeOne = await Likes.findOne({
      where: { UserId: userId, PostId: postId  },
    });
    console.log("UserId :: ",Likes.UserId)
    console.log("userId :: ",userId)
    console.log("PostId :: ",Likes.PostId)
    console.log("postId :: ",postId)
    console.log("콘솔로그::: ", checkLikeOne);
    return checkLikeOne;
  };
  // 6-2-1) 좋아요 up => likes테이블 생성
  createLike = async (postId, userId) => {
    const createLike = await Likes.create({
      UserId: userId,
      PostId: postId,
    });
    return createLike;
  };
  // 6-2-1-1) Posts에서 likes값 1증가
  likeUp = async (postId) => {
    const likeUp = await Posts.increment("likes", {
      where: { postId },
    });
    return likeUp;
  };

  // 6-2-2) 좋아요 down => Likes테이블 삭제
  deleteLike = async (postId, userId) => {
    const deleteLike = await Likes.destroy({
      where : {[Op.and]:[
      {PostId: postId},
      {UserId: userId}] }
    });
    return deleteLike;
  };
  // 6-2-2-1) Posts에서 likes 값 감소
  likeDown = async (postId) => {
    const likeDown = await Posts.decrement("likes", {
      where: { postId },
    });
    return likeDown;
  };
}

module.exports = LikeRepository;
