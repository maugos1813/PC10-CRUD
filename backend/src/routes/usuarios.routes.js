import { Router } from 'express'
import { getAll, deleteById, createU, totalUpdate, partialUpdate } from '../controllers/usuarios.controller.js'

const router = Router()

router.get('/', getAll)
router.post('/', createU)
router.delete('/:id', deleteById)
router.put('/:id', totalUpdate)
router.patch('/:id', partialUpdate)

export default router
