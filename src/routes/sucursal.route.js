import { Router } from 'express'
import {
  createSucursal,
  deleteSucursal,
  getSucursal,
  getSucursales,
  updateSucursal
} from '../controllers/index.js'
import { authRolMiddleware, validateId } from '../middlewares/index.js'

const router = Router()

router.get('/', getSucursales)

router.get('/:id', validateId, getSucursal)

router.post('/', authRolMiddleware(['Admin']), createSucursal)

router.put('/:id', authRolMiddleware(['Admin']), validateId, updateSucursal)

router.delete('/:id', authRolMiddleware(['Admin']), validateId, deleteSucursal)

export { router }
