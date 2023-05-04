const { Posts } = require("../models");

class PostRepository {
  // 1) 게시글 등록
  createPost = async (userId, title, content) => {
    const createPost = await Posts.create({
      UserId: userId,
      title,
      content,
    });
    return createPost;
  };

  // 2) 게시글 전체조회
  findAllPost = async () => {
    const AllPosts = await Posts.findAll();
    return AllPosts;
  };

  // 3) 게시글 상세조회
  findOnePost = async (postId) => {
    const DetailPosts = await Posts.findByPk(postId);
    return DetailPosts;
  };

  // 4) 게시글 수정 =>userid검증 안된 상태
  modifyPost = async (title, content, postId) => {
    const checkPost = await Posts.findByPk(postId);

    const modifyPost = await checkPost.update(
      { title, content },
      { where: { postId } }
    );

    return modifyPost;
  };

  // 5) 게시글 삭제
  deletePost = async (postId) => {
    const post = await Posts.findByPk(postId);
    await post.destroy();
    return;
  };
}

module.exports = PostRepository;
