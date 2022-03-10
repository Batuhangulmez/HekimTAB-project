import axios from 'axios'


const API = axios.create({
    baseURL: 'http://localhost:3001',
})

export const login = async (formData) =>
    await API.post('/users/signin', formData)

export const fetchPost = async () => API.get('/posts')

export const createPost = async (newPost) =>
    await API.post('/posts', newPost)
