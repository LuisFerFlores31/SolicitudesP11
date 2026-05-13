import { get, post, put, del } from './client'

export const getRequests = () => get('/requests')
export const getRequest = (id) => get(`/requests/${id}`)
export const createRequest = (data) => post('/requests', data)
export const updateRequest = (id, data) => put(`/requests/${id}`, data)
export const deleteRequest = (id) => del(`/requests/${id}`)
