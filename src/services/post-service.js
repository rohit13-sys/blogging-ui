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
    .then((resp) => {
      console.log(resp.data);
      return resp.data
    });
};

export const getPostById = (postId) => {
  return publicAxios.get(`/posts/posts/${postId}`).then((resp) => resp.data);
};

export const createComment = (comment, post, userId) => {
  return privateAxios
    .post(`/comments/create-comment/user/${userId}/post/${post.id}`, comment)
    .then((resp) => resp.data);
};

export const uploadPostImage = (postId, image) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/posts/image-upload/${postId}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((resp) => resp.data);
};

export const loadPostsByCategory = (categoryId) => {
  return publicAxios
    .get(
      `/posts/category/${categoryId}/posts`
    )
    .then(resp => resp.data);
};

export const loadPostByUser = (userId, pageNumber, pageSize) => {
  return publicAxios
    .get(
      `/posts/user/${userId}/posts?pageNo=${pageNumber}&pageSize=${pageSize}`
    )
    .then((resp) => resp.data);
};

export const deletePostById = (postId) => {
  console.log(postId);
  return privateAxios
    .delete(`/posts/delete-posts/${postId}`)
    .then((resp) => {
      if (resp.status == '401') {
        console.log("UNAUTHORIZED");
      }
      return resp;
    });
};



export const updatePostById = (postId, post) => {
  console.log(postId);
  console.log(post);
  return privateAxios.put(`/posts/update-posts/${postId}`,post).then(resp=>resp.data);
}

export const storeLikeCounts = (postId, likeCounts,dislikeCounts) => {
  return privateAxios.put(`/posts/post/like/${postId}/${likeCounts}/${dislikeCounts}`).then(resp => resp.data);
}
