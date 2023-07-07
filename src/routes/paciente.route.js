import { Router } from 'express'
import { getPaciente, getPacientes } from '../controllers/index.js'
import { validateId } from '../middlewares/index.js'

const router = Router()

router.get('/', getPacientes)

router.get('/:id', validateId, getPaciente)

export { router }
