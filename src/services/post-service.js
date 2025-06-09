import { privateAxios } from "./helper";
import { myAxios } from "./helper";

export const createPost = (postData) => {
    // console.log(postData)
    return privateAxios.post(`/posts/user/${postData.userId}/category/${postData.categoryId}`, postData).then((response) => {return response.data})
}

export const getAllPost = (pageNumber, pageSize) => {
    return myAxios.get(`/posts/?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortOrder=desc`).then((response) => {return response.data})
}

export const getPost = (postId) => {
    return myAxios.get("/posts/" + postId).then((response) => {return response.data})
}

export const createComment = (comment, postId) => {
    return privateAxios.post(`/comment/post/${postId}`, comment)
}

export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios.post(`/posts/${postId}/upload-image`, formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    }).then((response) => response.data)
}

export function loadAllPostByCategory(categoryId) {
    return privateAxios.get(`/posts/category/${categoryId}`).then(response => response.data)
}

export function loadAllPostByUser(userId) {
    return privateAxios.get(`/posts/user/${userId}`).then(response => response.data)
}

export function deletePostService(postId) {
    return privateAxios.delete(`/posts/${postId}`).then(response => response.data)
}

export function updatePostService(post, postId) {
    console.log(post);
    return privateAxios.put(`/posts/${postId}`, post).then(response => response.data)
}