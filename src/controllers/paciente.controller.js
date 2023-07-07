import { eq } from 'drizzle-orm'
import { db, pacienteTable } from '../db/index.js'
import { handleHttpError, handleErrorResponse } from '../lib/index.js'

export const getPaciente = async (req, res) => {
  try {
    const { id } = req.params

    const pacient = await db.query.pacienteTable.findFirst({
      where: eq(pacienteTable.id, id)
    })

    if (!pacient) {
      return handleErrorResponse(res, 'PACIENT_NOT_EXISTS', 404)
    }
    return res.json(pacient)
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const getPacientes = async (_req, res) => {
  try {
    const pacients = await db.query.pacienteTable.findMany({
      with: {
        estado_civil: true,
        sucursal: true,
        evaluador: {
          with: {
            persona: { with: { sexo: true } },
            user: {
              columns: {
                id: true,
                email: true,
                createdAt: true,
                updateAt: true
              },
              with: { rol: true }
            },
            sucursal: true
          }
        },
        persona: { with: { sexo: true } },
        responsable: true,
        user: true
      }
    })

    console.log(pacients)
    const count = pacients.length

    return res.json({ count, results: pacients })
  } catch (e) {
    return handleHttpError(res, e)
  }
}
