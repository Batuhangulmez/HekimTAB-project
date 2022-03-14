import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const login = async (formData) =>
  await API.post("/users/signin", formData);

export const fetchPosts = async () => await API.get("/posts");

export const fetchPost = async (id) => await API.get(`/posts/${id}`);

export const createPost = async (newPost) => await API.post("/posts", newPost);

export const updatePost = async (id, updatePost) =>
  await API.put(`/posts/${id}`, updatePost);

export const deletePost = async (id) => await API.delete(`/posts/${id}`);
