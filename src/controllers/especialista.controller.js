import { eq } from 'drizzle-orm'
import { db, especialistaTable } from '../db/index.js'
import { handleHttpError, handleErrorResponse } from '../lib/index.js'

export const getEspecialista = async (req, res) => {
  try {
    const { id } = req.params

    const especialista = await db.query.especialistaTable.findFirst({
      where: eq(especialistaTable.id, id),
      with: {
        sucursal: true,
        persona: { with: { sexo: true } },
        user: {
          columns: {
            id: true,
            email: true,
            createdAt: true,
            updateAt: true
          },
          with: { rol: true }
        }
      },
      columns: { id: true, createdAt: true, updateAt: true }
    })

    if (!especialista) {
      return handleErrorResponse(res, 'ESPECIALISTA_NOT_EXISTS', 404)
    }
    return res.json(especialista)
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const getEspecialistas = async (_req, res) => {
  try {
    const especialistas = await db.query.especialistaTable.findMany({
      with: {
        sucursal: true,
        persona: { with: { sexo: true } },
        user: {
          columns: {
            id: true,
            email: true,
            createdAt: true,
            updateAt: true
          },
          with: { rol: true }
        }
      },
      columns: { id: true, createdAt: true, updateAt: true }
    })

    console.log(especialistas)
    const count = especialistas.length

    return res.json({ count, results: especialistas })
  } catch (e) {
    return handleHttpError(res, e)
  }
}
