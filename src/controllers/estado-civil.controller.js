import { eq } from 'drizzle-orm'
import { db, estadoCivilTable } from '../db/index.js'
import { handleHttpError, handleErrorResponse } from '../lib/index.js'
import { EstadoCivilValidator } from '../validators/index.js'

export const getEstadoCivil = async (req, res) => {
  try {
    const { id } = req.params

    const estadoCivil = await db.query.estadoCivilTable.findFirst({
      where: eq(estadoCivilTable.id, id)
    })

    if (!estadoCivil) {
      return handleErrorResponse(res, 'CIVIL_STATUS_NOT_EXISTS', 404)
    }

    return res.json(estadoCivil)
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const getEstadosCiviles = async (_req, res) => {
  try {
    const date = new Date(2000, 1, 1)
    console.log(date)
    const estadosCiviles = await db.query.estadoCivilTable.findMany()
    const count = estadosCiviles.length

    return res.json({ count, results: estadosCiviles })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const createEstadoCivil = async (req, res) => {
  try {
    const body = req.body

    const { id, nombre } = EstadoCivilValidator.parse(body)

    const [newCivilStatus] = await db.insert(estadoCivilTable).values({
      id,
      nombre
    })

    return res.status(201).json({ data: newCivilStatus })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const updateEstadoCivil = async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body

    const { nombre } = EstadoCivilValidator.parse(body)

    const existingCivilStatus = await db.query.estadoCivilTable.findFirst({
      where: eq(estadoCivilTable.id, id)
    })

    if (!existingCivilStatus) {
      return handleErrorResponse(res, 'CIVIL_STATUS_NOT_EXISTS', 404)
    }

    const [updatedCivilStatus] = await db
      .update(estadoCivilTable)
      .set({
        nombre,
        updateAt: new Date()
      })
      .where(eq(estadoCivilTable.id, id))

    return res.json({ data: updatedCivilStatus })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const deleteEstadoCivil = async (req, res) => {
  try {
    const { id } = req.params

    const [delatedCivilStatus] = await db
      .delete(estadoCivilTable)
      .where(eq(estadoCivilTable.id, id))

    return res.json({ data: delatedCivilStatus })
  } catch (e) {
    return handleHttpError(res, e)
  }
}
