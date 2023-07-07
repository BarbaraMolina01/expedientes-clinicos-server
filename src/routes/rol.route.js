import { Router } from 'express'
import {
  createRol,
  deleteRol,
  getRol,
  getRoles,
  updateRol
} from '../controllers/index.js'
import { authRolMiddleware, validateId } from '../middlewares/index.js'

const router = Router()

router.get('/', getRoles)

router.get('/:id', validateId, getRol)

router.post('/', authRolMiddleware(['Admin']), createRol)

router.put('/:id', authRolMiddleware(['Admin']), validateId, updateRol)

router.delete('/:id', authRolMiddleware(['Admin']), validateId, deleteRol)

export { router }
