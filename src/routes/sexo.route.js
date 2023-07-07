import { Router } from 'express'
import {
  createSexo,
  deleteSexo,
  getSexo,
  getSexos,
  updateSexo
} from '../controllers/index.js'
import { authRolMiddleware, validateId } from '../middlewares/index.js'

const router = Router()

router.get('/', getSexos)

router.get('/:id', validateId, getSexo)

router.post('/', authRolMiddleware(['Admin']), createSexo)

router.put('/:id', authRolMiddleware(['Admin']), validateId, updateSexo)

router.delete('/:id', authRolMiddleware(['Admin']), validateId, deleteSexo)

export { router }
