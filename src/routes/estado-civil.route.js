import { Router } from 'express'
import {
  createEstadoCivil,
  deleteEstadoCivil,
  getEstadoCivil,
  getEstadosCiviles,
  updateEstadoCivil
} from '../controllers/index.js'
import { authRolMiddleware, validateId } from '../middlewares/index.js'

const router = Router()

router.get('/', getEstadosCiviles)

router.get('/:id', validateId, getEstadoCivil)

router.post('/', authRolMiddleware(['Admin']), createEstadoCivil)

router.put('/:id', authRolMiddleware(['Admin']), validateId, updateEstadoCivil)

router.delete(
  '/:id',
  authRolMiddleware(['Admin']),
  validateId,
  deleteEstadoCivil
)

export { router }
