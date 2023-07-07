import { eq } from 'drizzle-orm'
import { db, antecedentesFamiliaresTable } from '../db/index.js'
import { handleHttpError, handleErrorResponse } from '../lib/index.js'
import { AntecedentesFamiliaresValidator } from '../validators/index.js'

export const getAntecedenteFamiliar = async (req, res) => {
  try {
    const { id } = req.params

    const antecedenteFamiliar =
      await db.query.antecedentesFamiliaresTable.findFirst({
        where: eq(antecedentesFamiliaresTable.id, id)
      })

    if (!antecedenteFamiliar) {
      return handleErrorResponse(res, 'ANTECEDENTE_FAMILIAR_NOT_EXISTS', 404)
    }

    return res.json(antecedenteFamiliar)
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const getAntecedentesFamiliares = async (_req, res) => {
  try {
    const AntecedentesFamiliares =
      await db.query.antecedentesFamiliaresTable.findMany()
    const count = AntecedentesFamiliares.length

    return res.json({ count, results: AntecedentesFamiliares })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const createAntecedenteFamiliar = async (req, res) => {
  try {
    const body = req.body

    const { id, nombre } = AntecedentesFamiliaresValidator.parse(body)

    const [newAntecedentesFamiliares] = await db
      .insert(antecedentesFamiliaresTable)
      .values({
        id,
        nombre
      })

    return res.status(201).json({ data: newAntecedentesFamiliares })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const updateAntecedenteFamiliar = async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body

    const { nombre } = AntecedentesFamiliaresValidator.parse(body)

    const existingAntecedenteFamiliar =
      await db.query.antecedentesFamiliaresTable.findFirst({
        where: eq(antecedentesFamiliaresTable.id, id)
      })

    if (!existingAntecedenteFamiliar) {
      return handleErrorResponse(res, 'ANTECEDENTE_FAMILIAR_NOT_EXISTS', 404)
    }

    const [updatedAntecedenteFamiliar] = await db
      .update(antecedentesFamiliaresTable)
      .set({
        nombre,
        updateAt: new Date()
      })
      .where(eq(antecedentesFamiliaresTable.id, id))

    return res.json({ data: updatedAntecedenteFamiliar })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const deleteAntecedenteFamiliar = async (req, res) => {
  try {
    const { id } = req.params

    const [delatedAntecedenteFamiliar] = await db
      .delete(antecedentesFamiliaresTable)
      .where(eq(antecedentesFamiliaresTable.id, id))

    return res.json({ data: delatedAntecedenteFamiliar })
  } catch (e) {
    return handleHttpError(res, e)
  }
}
