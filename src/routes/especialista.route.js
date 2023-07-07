import { Router } from 'express'
import { getEspecialista, getEspecialistas } from '../controllers/index.js'
import { validateId } from '../middlewares/index.js'

const router = Router()

router.get('/', getEspecialistas)

router.get('/:id', validateId, getEspecialista)

export { router }
