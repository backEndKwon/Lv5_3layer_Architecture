const PostRepository = require("../repositories/posts.repository");
const { Posts } = require("../models");

class PostService {
  postRepository = new PostRepository(Posts);
  // 1) 게시글 등록
  createPost = async (userId, title, content) => {
    const createPost = await this.postRepository.createPost(
      userId,
      title,
      content
    );
    return createPost;
  };

  // 2) 게시글 전체조회
  findAllPost = async () => {
    const AllPosts = await this.postRepository.findAllPost();
    //게시글 정렬
    AllPosts.sort((x, y) => {
      return y.createdAt - x.createdAt;
    });

    return AllPosts.map((a) => {
      return {
        postId: a.postId,
        userId: a.UserId,
        title: a.title,
        createdAt: a.createdAt,
        updatedAt: a.createdAt,
      };
    });
  };

  // 3) 게시글 상세 조회
  findOnePost = async (postId) => {
    const DetailPost = await this.postRepository.findOnePost(postId);
   console.log(DetailPost)
   
      return {
      postId : postId,
      userId: DetailPost.UserId,
      title: DetailPost.title,
      content: DetailPost.content,
      likes: DetailPost.likes,
      createdAt: DetailPost.createdAt,
      updatedAt: DetailPost.updatedAt,
    };
  };

  // 4) 게시글 수정=>userid검증 안된 상태
  modifyPost = async (title, content, postId) => {
    const modifyPost = await this.postRepository.modifyPost(title, content, postId);
    return modifyPost;
  };

  // 5) 게시글 삭제
  deletePost = async (postId) => {
    await this.postRepository.deletePost(postId);
    return;
  };
}

module.exports = PostService;
