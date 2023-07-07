import * as z from 'zod'

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50)
})

export const UserValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50)
})

export const PersonaValidator = z.object({
  nombre: z.string().min(3).max(255),
  appat: z.string().min(3).max(255),
  apmat: z.string().min(3).max(255),
  // fecha_nac: z.date().min(new Date(1900, 1, 1)).max(new Date()),
  fecha_nac: z.string().transform((str) => new Date(str)),
  id_sex: z.number().int().positive()
})

export const RegisterAdminValidator = UserValidator.extend({})

export const RegisterEspecialistaValidator = UserValidator.merge(
  PersonaValidator
).extend({
  id_suc: z.number().int().positive()
})

export const RegisterPacienteValidator = UserValidator.merge(
  PersonaValidator
).extend({
  telefono: z.string().min(10).max(10),
  domicilio: z.string().min(3).max(255),
  lugar_nac: z.string().min(3).max(255),
  dni: z.string().min(8).max(8),
  ocupacion: z.string().min(3).max(255),
  desocupado_por_adiccion: z.boolean(),
  religion: z.string().min(3).max(255),
  separado_por_adiccion: z.boolean(),
  fecha_ingreso: z.string().transform((str) => new Date(str)),
  paretensco: z.string().min(3).max(255),
  persona_responsable: z.number().int().positive(),
  evaluador: z.number().int().positive(),
  id_estCiv: z.number().int().positive(),
  id_suc: z.number().int().positive()
})
