import { get, post } from './client'

export const login = (email, password) => post('/auth/login', { email, password })
export const logout = () => post('/auth/logout')
export const me = () => get('/auth/me')
