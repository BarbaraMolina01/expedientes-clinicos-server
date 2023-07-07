import express from 'express'
import {
  loginUser,
  registerAdmin,
  registerEspecialista,
  registerPaciente
} from '../controllers/index.js'

const router = express.Router()

router.post('/register/admin', registerAdmin)
router.post('/register/especialista', registerEspecialista)
router.post('/register/paciente', registerPaciente)

router.post('/login', loginUser)

export { router }
