import { eq } from 'drizzle-orm'
import { db, rolTable } from '../db/index.js'
import { handleHttpError, handleErrorResponse } from '../lib/index.js'
import { RolValidator } from '../validators/index.js'

export const getRol = async (req, res) => {
  try {
    const { id } = req.params

    const rol = await db.query.rolTable.findFirst({
      where: eq(rolTable.id, id)
    })

    if (!rol) return handleErrorResponse(res, 'ROL_NOT_EXISTS', 404)

    return res.json(rol)
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const getRoles = async (_req, res) => {
  try {
    const rol = await db.query.rolTable.findMany()
    const count = rol.length

    return res.json({ count, results: rol })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const createRol = async (req, res) => {
  try {
    const body = req.body

    const { id, nombre } = RolValidator.parse(body)

    const [newRole] = await db.insert(rolTable).values({
      id,
      nombre
    })

    return res.status(201).json({ data: newRole })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const updateRol = async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body

    const { nombre } = RolValidator.parse(body)

    const existingRol = await db.query.rolTable.findFirst({
      where: eq(rolTable.id, id)
    })

    if (!existingRol) return handleErrorResponse(res, 'ROL_NOT_EXISTS', 404)

    const [updatedRol] = await db
      .update(rolTable)
      .set({
        nombre,
        updateAt: new Date()
      })
      .where(eq(rolTable.id, id))

    return res.json({ data: updatedRol })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params

    const [delatedRol] = await db.delete(rolTable).where(eq(rolTable.id, id))

    return res.json({ data: delatedRol })
  } catch (e) {
    return handleHttpError(res, e)
  }
}
