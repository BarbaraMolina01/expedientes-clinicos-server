import { Router } from 'express'
import {
  createAntecedenteFamiliar,
  deleteAntecedenteFamiliar,
  getAntecedenteFamiliar,
  getAntecedentesFamiliares,
  updateAntecedenteFamiliar
} from '../controllers/index.js'
import { authRolMiddleware, validateId } from '../middlewares/index.js'

const router = Router()

router.get('/', getAntecedentesFamiliares)

router.get('/:id', validateId, getAntecedenteFamiliar)

router.post('/', authRolMiddleware(['Admin']), createAntecedenteFamiliar)

router.put(
  '/:id',
  authRolMiddleware(['Admin']),
  validateId,
  updateAntecedenteFamiliar
)

router.delete(
  '/:id',
  authRolMiddleware(['Admin']),
  validateId,
  deleteAntecedenteFamiliar
)

export { router }
