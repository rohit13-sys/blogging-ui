import { privateAxios, publicAxios } from "./helper";

//create Posts
export const addPost = (post) => {
  return privateAxios
    .post(`/posts/user/${post.userId}/category/${post.categoryId}/posts`, post)
    .then((resp) => resp.data);
};

//get All posts
export const getAllPosts = (pageNumber, pageSize) => {
  return publicAxios
    .get(`/posts/all-posts?pageNo=${pageNumber}&pageSize=${pageSize}`)
    .then((resp) => resp.data);
};

export const getPostById = (postId) => {
  return publicAxios.get(`/posts/posts/${postId}`).then((resp) => resp.data);
};


export const createComment = (comment, post,userId) => {
  return privateAxios
    .post(`/comments/create-comment/user/${userId}/post/${post.id}`,comment)
    .then((resp) => resp.data);
}
