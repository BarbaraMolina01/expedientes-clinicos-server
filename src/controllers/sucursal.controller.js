import { eq } from 'drizzle-orm'
import { db, sucursalTable } from '../db/index.js'
import { handleHttpError, handleErrorResponse } from '../lib/index.js'
import { SucursalValidator } from '../validators/index.js'

export const getSucursal = async (req, res) => {
  try {
    const { id } = req.params

    const subsidiary = await db.query.sucursalTable.findFirst({
      where: eq(sucursalTable.id, id)
    })

    if (!subsidiary) {
      return handleErrorResponse(res, 'SUBSIDIARY_NOT_EXISTS', 404)
    }
    return res.json(subsidiary)
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const getSucursales = async (_req, res) => {
  try {
    const subsidiaries = await db.query.sucursalTable.findMany()
    const count = subsidiaries.length

    return res.json({ count, results: subsidiaries })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const createSucursal = async (req, res) => {
  try {
    const body = req.body

    const { id, nombre } = SucursalValidator.parse(body)

    const [newSubsidiary] = await db.insert(sucursalTable).values({
      id,
      nombre
    })

    return res.status(201).json({ data: newSubsidiary })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const updateSucursal = async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body

    const { nombre } = SucursalValidator.parse(body)

    const existingSubsidiary = await db.query.sucursalTable.findFirst({
      where: eq(sucursalTable.id, id)
    })

    if (!existingSubsidiary) {
      return handleErrorResponse(res, 'SUBSIDIARY_NOT_EXISTS', 404)
    }

    const [updatedSubsidiary] = await db
      .update(sucursalTable)
      .set({
        nombre,
        updateAt: new Date()
      })
      .where(eq(sucursalTable.id, id))

    return res.json({ data: updatedSubsidiary })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const deleteSucursal = async (req, res) => {
  try {
    const { id } = req.params

    const [delatedSubsidiary] = await db
      .delete(sucursalTable)
      .where(eq(sucursalTable.id, id))

    return res.json({ data: delatedSubsidiary })
  } catch (e) {
    return handleHttpError(res, e)
  }
}
