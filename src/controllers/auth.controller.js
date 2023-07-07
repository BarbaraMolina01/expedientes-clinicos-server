import {
  LoginValidator,
  RegisterAdminValidator,
  RegisterEspecialistaValidator,
  RegisterPacienteValidator
} from '../validators/index.js'
import {
  db,
  adminTable,
  userTable,
  personaTable,
  especialistaTable,
  pacienteTable
} from '../db/index.js'
import {
  encrypt,
  compare,
  handleErrorResponse,
  handleHttpError,
  tokenSign
} from '../lib/index.js'
import { eq } from 'drizzle-orm'

export const loginUser = async (req, res) => {
  try {
    const body = req.body
    const { email, password } = LoginValidator.parse(body)

    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
      with: { rol: true }
    })

    if (!user) {
      return handleErrorResponse(res, 'INVALID_CREDENTIALS', 400)
    }

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
      return handleErrorResponse(res, 'INVALID_CREDENTIALS', 400)
    }

    delete user.password
    delete user.id_rol

    const tokenJwt = await tokenSign({
      id: user.id,
      email: user.email,
      rol: user.rol,
      createdAt: user.createdAt,
      updateAt: user.updateAt
    })

    return res.json({ data: { token: tokenJwt, user } })
  } catch (e) {
    handleHttpError(res, e)
  }
}

export const registerAdmin = async (req, res) => {
  try {
    const body = req.body
    const { email, password } = RegisterAdminValidator.parse(body)

    const checkIsExist = await db.query.userTable.findFirst({
      where: eq(userTable.email, email)
    })

    if (checkIsExist) {
      return handleErrorResponse(res, 'USER_EXISTS', 400)
    }

    const encryptedPassword = await encrypt(password)

    const [newUser] = await db.insert(userTable).values({
      email,
      password: encryptedPassword,
      id_rol: 1
    })

    const [newAdmin] = await db.insert(adminTable).values({
      id_user: newUser.insertId
    })

    return res.status(201).json({ data: newAdmin })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const registerEspecialista = async (req, res) => {
  try {
    const body = req.body
    const { email, password, nombre, apmat, appat, fecha_nac, id_sex, id_suc } =
      RegisterEspecialistaValidator.parse(body)

    const checkIsExist = await db.query.userTable.findFirst({
      where: eq(userTable.email, email)
    })

    if (checkIsExist) {
      return handleErrorResponse(res, 'USER_EXISTS', 400)
    }

    const encryptedPassword = await encrypt(password)

    const [newUser] = await db.insert(userTable).values({
      email,
      password: encryptedPassword,
      id_rol: 2
    })

    const [newPerson] = await db.insert(personaTable).values({
      apmat,
      appat,
      fecha_nac,
      id_sex,
      nombre
    })

    const [newEsp] = await db.insert(especialistaTable).values({
      id_user: newUser.insertId,
      id_per: newPerson.insertId,
      id_suc
    })

    return res.status(201).json({ data: newEsp })
  } catch (e) {
    return handleHttpError(res, e)
  }
}

export const registerPaciente = async (req, res) => {
  try {
    const body = req.body
    const {
      email,
      password,
      nombre,
      apmat,
      appat,
      fecha_nac,
      id_sex,
      telefono,
      domicilio,
      lugar_nac,
      dni,
      ocupacion,
      desocupado_por_adiccion,
      religion,
      separado_por_adiccion,
      fecha_ingreso,
      paretensco,
      persona_responsable,
      evaluador,
      id_estCiv,
      id_suc
    } = RegisterPacienteValidator.parse(body)

    const checkIsExist = await db.query.userTable.findFirst({
      where: eq(userTable.email, email)
    })

    if (checkIsExist) {
      return handleErrorResponse(res, 'USER_EXISTS', 400)
    }

    const encryptedPassword = await encrypt(password)

    const [newUser] = await db.insert(userTable).values({
      email,
      password: encryptedPassword,
      id_rol: 3
    })

    const [newPerson] = await db.insert(personaTable).values({
      apmat,
      appat,
      fecha_nac,
      id_sex,
      nombre
    })

    const [newPatient] = await db.insert(pacienteTable).values({
      id_user: newUser.insertId,

      telefono,
      domicilio,
      lugar_nac,
      dni,
      ocupacion,
      desocupado_por_adiccion,
      religion,
      separado_por_adiccion,
      fecha_ingreso,
      paretensco,
      persona_responsable,
      evaluador,
      id_per: newPerson.insertId,
      id_estCiv,
      id_suc
    })

    return res.status(201).json({ data: newPatient })
  } catch (e) {
    return handleHttpError(res, e)
  }
}
