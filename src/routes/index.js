import { Router } from 'express'
import { readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PATH_ROUTES = path.join(__dirname, '/')

const router = Router()

const cleanFileName = (fileName) => {
  const file = fileName.split('.').shift()
  return file
}

readdirSync(PATH_ROUTES).forEach((fileName) => {
  const cleanName = cleanFileName(fileName)
  if (cleanName !== 'index') {
    import(`./${fileName}`).then((moduleRouter) => {
      console.log(`Se esta cargando la ruta... ${cleanName}`)
      router.use(`/api/${cleanName}`, moduleRouter.router)
    })
  }
})

export { router }
