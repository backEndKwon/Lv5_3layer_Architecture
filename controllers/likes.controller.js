//상위계층
const LikeService = require("../services/likes.service");

class LikesController {
  likeService = new LikeService(); //PostsController Class멤버변수로 할당

  // 6) 좋아요 누르기
  putLikes = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    try {
      //좋아요할 게시물 있는지 확인
      const checkLikePost = await this.likeService.checkLikePost(postId);

      if (!checkLikePost) {
        return res
          .status(412)
          .json({ errorMessage: "412, 좋아요 할 게시글 없음" });
      }

      const checkLikeOne = await this.likeService.checkLikeOne(userId, postId);

      if (!checkLikeOne) {
        //Likes 계정 생성
        await this.likeService.createLike(postId, userId);
        //Posts의 likes -1
        await this.likeService.likeUp(postId);
        return res.status(200).json({ message: "좋아요 성공" });
      } else {
        //Likes에 계정있으면?(이미 좋아요 눌린거니까)
        //Likes 계정 삭제
        await this.likeService.deleteLike(postId, userId);
        //Posts의 likes -1
        await this.likeService.likeDown(postId);
        return res.status(200).json({ message: "좋아요 취소" });
      }
    } catch (err) {
      console.error(`control 좋아요 에러`, err);
      throw new Error("400, 다른 사유로 좋아요 실패");
    }
  };
}

module.exports = LikesController;
