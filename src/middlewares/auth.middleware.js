import {
  verifyToken,
  handleErrorResponse,
  handleHttpError
} from '../lib/index.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization

    if (!bearer) return handleErrorResponse(res, 'NOT_ALLOW', 409)

    const token = bearer.split(' ').pop()
    const tokenData = await verifyToken(token)
    console.log(tokenData)
    if (tokenData.id) {
      next()
    } else {
      handleErrorResponse(res, 'NOT_ALLOW', 409)
    }
  } catch (e) {
    handleHttpError(res, e)
  }
}

export const authRolMiddleware = (roles) => async (req, res, next) => {
  try {
    const bearer = req.headers.authorization

    if (!bearer) {
      return handleErrorResponse(res, 'NOT_ALLOW', 409)
    }

    const token = bearer.split(' ').pop()
    const { rol } = await verifyToken(token)

    if ([].concat(roles).includes(rol.nombre)) {
      return next()
    }
    return handleErrorResponse(res, 'NOT_ROL', 409)
  } catch (e) {
    return handleHttpError(res, e)
  }
}
