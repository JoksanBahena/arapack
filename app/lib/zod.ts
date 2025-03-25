import { object, string, z } from "zod";

export const createBoxSchema = object({
  client: string({
    required_error: "El cliente es requerido",
  }).min(1, "El cliente es requerido"), // Verifica que no esté vacío

  creases: object({
    r1: z
      .number()
      .min(1, {
        message: "El valor debe ser mayor a 0",
      })
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Debe ser un número válido mayor o igual a 0",
      }),
    r2: z
      .number()
      .min(1, {
        message: "El valor debe ser mayor a 0",
      })
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Debe ser un número válido mayor o igual a 0",
      }),
    r3: z
      .number()
      .min(1, {
        message: "El valor debe ser mayor a 0",
      })
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Debe ser un número válido mayor o igual a 0",
      }),
  }),

  ect: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El valor debe ser un número mayor o igual a 0",
    }),

  flute: string({
    required_error: "El valor es requerido",
  }).min(1, "El valor es requerido"),

  length: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El largo debe ser un número válido mayor o igual a 0",
    }),

  liner: string({
    required_error: "El valor es requerido",
  }).min(1, "El valor es requerido"),

  pdf_link: z
    .array(z.instanceof(File), {
      invalid_type_error: "Debe ser un archivo válido",
    })
    .default([]),

  status: z.enum(["pending", "completed"], {
    invalid_type_error: "El estado debe ser 'pending' o 'completed'",
  }),

  symbol: string({
    required_error: "El símbolo es requerido",
  }).min(1, "El símbolo es requerido"),

  treatment: z
    .number()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El tratamiento debe ser un número válido mayor o igual a 0",
    }),

  type: z.string({
    required_error: "El tipo es requerido",
  }).min(1, "El tipo es requerido"),

  width: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El ancho debe ser un número válido mayor o igual a 0",
    }),
});
