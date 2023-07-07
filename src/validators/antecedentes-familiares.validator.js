import * as z from 'zod'

export const AntecedentesFamiliaresValidator = z.object({
  id: z.number().int().positive().optional(),
  padre: z.boolean(),
  madre: z.boolean(),
  abueloPat: z.boolean(),
  abuelaPat: z.boolean(),
  abueloMat: z.boolean(),
  abuelaMat: z.boolean(),
  tios: z.boolean(),
  otros: z.string().min(3).max(255).optional(),

  id_pac: z.number().int().positive()
})
