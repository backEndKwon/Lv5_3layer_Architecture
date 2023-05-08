//상위계층
const PostService = require("../services/posts.service");
const { Posts } = require("../models");

class PostsController {
  postService = new PostService(); //PostsController Class멤버변수로 할당

  //1) 게시글 등록
  createPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;
    try {
      //제목,내용 데이터 전달 확인
      if (!title || !content) {
        throw new Error("412, 제목 또는 내용을 입력하세요");
      }
      let checkTitle = /^[\s\S]{1,40}$/.test(title);
      if (!checkTitle) {
        throw new Error("412,제목 형식이 잘못되었음");
      }
      let checkContent = /^[\s\S]{1,3000}$/.test(content);
      if (!checkContent) {
        throw new Error("412,내용 형식이 잘못되었음");
      }

      await this.postService.createPost(userId, title, content);
      return res.status(201).json({ message: "게시물 작성 성공" });
    } catch (err) {
      return res.status(400).json({ errorMessage: "게시물 작성 실패" });
    }
  };

  // 2) 게시글 전체 조회
  getPost = async (req, res, next) => {
    try {
      const AllPosts = await this.postService.findAllPost();
      return res.status(200).json({ post: AllPosts });
    } catch (err) {
      return res.status(400).json({ errorMessage: "게시물 조회 실패" });
    }
  };

  // 3) 게시글 상세 조회
  getDetailPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const DetailPost = await this.postService.findOnePost(postId);
      return res.status(200).json({ DetailPost: DetailPost });
    } catch (err) {
      return res.status(400).json({ errorMessage: "게시물 상세조회 실패" });
    }
  };

  // 4) 게시글 수정
  putPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    //게시글 존재여부 확인
    const checkPost = await this.postService.findOnePost(postId);
    console.log(checkPost);

    if (!checkPost) {
      throw new Error("412, 수정할 게시글 없음");
    }
    //userid 검증 완료
    if (userId !== checkPost.UserId) {
      throw new Error("412, 수정 권한 없음");
    }
    if (typeof title !== "string") {
      throw new Error("412, 제목 형식 올바르지 않음");
    }
    if (typeof content !== "string") {
      throw new Error("412, 내용 형식 올바르지 않음");
    }
    if (!title || !content) {
      throw new Error("412, 데이터 형식 올바르지 않음");
    }

    await this.postService.modifyPost(title, content, postId);
    return res.status(200).json({ message: "게시글 수정완료" });
  };

  // 5) 게시글 삭제
  deletePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    //게시글 존재여부 확인
    const checkPost2 = await this.postService.findOnePost(postId);
    try {
      if (!checkPost2) {
        throw new Error("412, 삭제할할 게시글 없음");
      }
      //userid 검증 완료
      console.log(userId);
      console.log(checkPost2.userId);
      if (userId !== checkPost2.userId) {
        throw new Error("412, 삭제 권한 없음");
      }
      await this.postService.deletePost(postId);
      return res.status(200).json({ message: "게시글 삭제완료" });
    } catch (err) {
      console.error(err);
      throw new Error("400, 게시글 삭제 실패");
    }
  };
}

module.exports = PostsController;
