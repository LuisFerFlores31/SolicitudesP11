import { get, post, put, del } from './client'

export const getUsers = () => get('/users')
export const getUser = (id) => get(`/users/${id}`)
export const createUser = (data) => post('/users', data)
export const updateUser = (id, data) => put(`/users/${id}`, data)
export const deleteUser = (id) => del(`/users/${id}`)
export const getUserAreas = (id) => get(`/users/${id}/areas`)
export const assignUserArea = (id, area_id) => post(`/users/${id}/areas`, { area_id })
export const removeUserArea = (id, areaId) => del(`/users/${id}/areas/${areaId}`)
