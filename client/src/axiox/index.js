import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const Login = async (userData) =>
  await API.post("/users/signin", userData);

export const signUp = async (newUser) =>
  await API.post("/users/signup", newUser);

export const fetchUserInfo = async (_id) => await API.get(`/users/user/${_id}`);

export const logOut = async (id) => await API.get(`/users/logout/${id}`);

export const fetchPosts = async () => await API.get("/posts");

export const fetchPostUser = async (creatorId) =>
  await API.get(`/posts/user/${creatorId}`);

export const createPost = async (newPost) => await API.post("/posts", newPost);

export const pushComment = async (id, updatePost) =>
  await API.put(`/posts/${id}`, updatePost);

export const deleteComment = async (id, commentId) =>
  await API.put(`/posts/${id}/comment/${commentId}`);

export const deletePost = async (id) => await API.delete(`/posts/${id}`);
