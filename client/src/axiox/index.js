import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const Login = async (userData) =>
  await API.post("/users/signin", userData);

export const signUp = async (newUser) =>
  await API.post("/users/signup", newUser);

export const fetchPosts = async () => await API.get("/posts");

export const fetchPost = async (id) => await API.get(`/posts/${id}`);

export const createPost = async (newPost) => await API.post("/posts", newPost);

export const updatePost = async (id, updatePost) =>
  await API.put(`/posts/${id}`, updatePost);

export const deletePost = async (id) => await API.delete(`/posts/${id}`);
