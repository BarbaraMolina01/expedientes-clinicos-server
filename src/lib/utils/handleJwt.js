import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { JWT_SECRET } from '../constant/index.js'

export const encrypt = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10)
  return hash
}

export const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword)
}

export const tokenSign = async (user) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '2h'
  })
}

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return null
  }
}

export const decodeSign = (token) => {
  return jwt.decode(token, null)
}
