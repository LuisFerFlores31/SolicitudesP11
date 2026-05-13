const router = require('express').Router()
const { getAll, getById, create, update, remove, getUserAreas, assignArea, removeArea } = require('../controllers/users.controller')

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

router.get('/:id/areas', getUserAreas)
router.post('/:id/areas', assignArea)
router.delete('/:id/areas/:areaId', removeArea)

module.exports = router
