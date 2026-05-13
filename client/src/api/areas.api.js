import { get, post, put, del } from './client'

export const getAreas = () => get('/areas')
export const getArea = (id) => get(`/areas/${id}`)
export const createArea = (data) => post('/areas', data)
export const updateArea = (id, data) => put(`/areas/${id}`, data)
export const deleteArea = (id) => del(`/areas/${id}`)
