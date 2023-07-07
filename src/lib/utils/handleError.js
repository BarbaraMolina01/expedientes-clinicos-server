import { z } from 'zod'

export const handleHttpError = (res, error) => {
  if (error instanceof z.ZodError) {
    return handleErrorResponse(res, error.errors, 422)
  }
  console.log('Error', error)

  return res.status(500).send({ error: 'ERROR' })
}

export const handleErrorResponse = (
  res,
  message = 'Algo ocurrio',
  code = 401
) => {
  console.log('Error', message)

  return res.status(code).send({ error: message })
}
