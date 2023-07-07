import { eq } from 'drizzle-orm'
import { db, sexoTable } from '../db/index.js'
import { handleHttpError, handleErrorResponse } from '../lib/index.js'
import { SexoValidator } from '../validators/index.js'

export const getSexo = async (req, res) => {
  try {
    const { id } = req.params

    const sexo = await db.query.sexoTable.findFirst({
      where: eq(sexoTable.id, id)
    })

    if (!sexo) return handleErrorResponse(res, 'SEX_NOT_EXISTS', 404)

    return res.json(sexo)
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const getSexos = async (_req, res) => {
  try {
    const sexos = await db.query.sexoTable.findMany()
    const count = sexos.length

    return res.json({ count, results: sexos })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const createSexo = async (req, res) => {
  try {
    const body = req.body

    const { id, nombre } = SexoValidator.parse(body)

    const [newSexs] = await db.insert(sexoTable).values({
      id,
      nombre
    })

    return res.status(201).json({ data: newSexs })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const updateSexo = async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body

    const { nombre } = SexoValidator.parse(body)

    const existingSex = await db.query.sexoTable.findFirst({
      where: eq(sexoTable.id, id)
    })

    if (!existingSex) return handleErrorResponse(res, 'SEX_NOT_EXISTS', 404)

    const [updatedSex] = await db
      .update(sexoTable)
      .set({
        nombre,
        updateAt: new Date()
      })
      .where(eq(sexoTable.id, id))

    return res.json({ data: updatedSex })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const deleteSexo = async (req, res) => {
  try {
    const { id } = req.params

    const [delatedSex] = await db.delete(sexoTable).where(eq(sexoTable.id, id))

    return res.json({ data: delatedSex })
  } catch (e) {
    return handleHttpError(res, e)
  }
}
