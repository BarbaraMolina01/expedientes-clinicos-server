import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { router } from './routes/index.js'

const app = express()

app.use(cors()) // CORS

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/', router)
// app.use('/api/aes', encodeRoutes)

export default app
