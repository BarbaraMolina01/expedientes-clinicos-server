import { handleHttpError, handleErrorResponse } from '../lib/index.js'

export const validateId = async (req, res, next) => {
  try {
    const { id } = req.params

    const baseUrl = req.baseUrl
    const route = baseUrl.split('/').pop()
    console.log(route)

    const BASE_MSG = `${route.toUpperCase()}_ID_NOT`

    if (!id) return handleErrorResponse(res, `${BASE_MSG}_EXISTS`, 400)

    if (isNaN(id)) return handleErrorResponse(res, `${BASE_MSG}_NUMBER`, 400)

    next()
  } catch (e) {
    handleHttpError(res, e)
  }
}
