const router = require('express').Router()
const { isAuthenticated } = require('../middleware/auth')
const { getAll, getById, create, update, remove } = require('../controllers/requests.controller')

router.get('/', isAuthenticated, getAll)
router.get('/:id', isAuthenticated, getById)
router.post('/', isAuthenticated, create)
router.put('/:id', isAuthenticated, update)
router.delete('/:id', isAuthenticated, remove)

module.exports = router
