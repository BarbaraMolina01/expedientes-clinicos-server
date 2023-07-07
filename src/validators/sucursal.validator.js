import * as z from 'zod'

export const SucursalValidator = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string().min(3).max(255)
})
