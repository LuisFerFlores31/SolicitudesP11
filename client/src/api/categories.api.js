import { get, post, put, del } from './client'

export const getCategories = () => get('/categories')
export const getCategory = (id) => get(`/categories/${id}`)
export const createCategory = (data) => post('/categories', data)
export const updateCategory = (id, data) => put(`/categories/${id}`, data)
export const deleteCategory = (id) => del(`/categories/${id}`)
