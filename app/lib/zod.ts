import { object, string, symbol, z } from "zod";

export const createBoxSchema = object({
  client: string({
    required_error: "El cliente es requerido",
  }).min(1, "El cliente es requerido"),

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
  }).min(1, "Seleccione el tipo de flauta"),

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
  }).min(1, "Seleccione el tipo de liner"),

  // En createBoxSchema
  pdf_link: z
    .array(z.instanceof(File), {
      invalid_type_error: "Debe ser un archivo válido",
      required_error: "El archivo es requerido",
    })
    .nonempty({ message: "Seleccione el archivo PDF" }),

  status: z.enum(["pending", "approved"], {
    invalid_type_error: "El estado debe ser 'Pendiente' o 'Aprobado'",
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

  type: z
    .string({
      required_error: "El tipo es requerido",
    })
    .min(1, "El tipo es requerido"),

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

export const createSheetSchema = object({
  boxes: z.array(z.string()).min(1, {
    message: "Al menos una caja es requerida",
  }),
  description: string({
    required_error: "La descripción es requerida",
  }).min(1, "La descripción es requerida"),
  ect: z.array(z.string()).min(1, {
    message: "Ingrese al menos un valor",
  }),
  grams: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El valor debe ser un número mayor o igual a 0",
    }),
  p1: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El valor debe ser un número mayor o igual a 0",
    }),
  p2: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El valor debe ser un número mayor o igual a 0",
    }),
  p3: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El valor debe ser un número mayor o igual a 0",
    }),
  roll_width: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El valor debe ser un número mayor o igual a 0",
    }),
});
