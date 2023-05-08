const LikeRepository = require("../repositories/likes.repository");
const { Likes }= require("../models");


class LikeService {
  likeRepository = new LikeRepository(Likes);

  // 6) 게시물 좋아요 누르기
  // 6-0) 있는 게시물인지 확인
  checkLikePost = async (postId) => {
    const checkLikePost = await this.likeRepository.checkLikePost(postId);
    return checkLikePost;
  };
    // 6-1-2) like 고유번호 세팅단계
  checkLikeOne = async (userId, postId) => {
    const checkLikeOne = await this.likeRepository.checkLikeOne(postId,userId);
    return checkLikeOne;
  };
   // 6-2-1) 좋아요 up => likes테이블 생성
   createLike = async (postId, userId) => {
    const createLike = await this.likeRepository.createLike(postId,userId)
      return createLike;
    }
   // 6-2-1-1) Posts에서 likes값 1증가
   likeUp = async(postId)=>{
    const likeUp = await this.likeRepository.likeUp(postId)
    return likeUp
  }
// 6-2-2) 좋아요 down => Likes테이블 삭제 
deleteLike = async (postId, userId) => {
  const deleteLike = await this.likeRepository.deleteLike(postId,userId)
  return deleteLike;
  };
  // 6-2-2-1) Posts에서 likes 값 감소
  likeDown = async(postId)=>{
    const likeDown = await this.likeRepository.likeDown(postId)
    return likeDown
  }
}

module.exports = LikeService;
