import { object, string, z } from "zod";

export const createBoxSchema = object({
  client: string({
    required_error: "El cliente es requerido",
  }).min(1, "El cliente es requerido"),

  creases: object({
    r1: z
      .number()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Debe ser un número válido mayor o igual a 0",
      })
      .optional(),
    r2: z
      .number()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Debe ser un número válido mayor o igual a 0",
      })
      .optional(),
    r3: z
      .number()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Debe ser un número válido mayor o igual a 0",
      })
      .optional(),
  }),

  inks: object({
    gcmi_1: z.string().optional(),
    gcmi_2: z.string().optional(),
    gcmi_3: z.string().optional(),
    gcmi_4: z.string().optional(),
  }),

  weight: z
    .number()
    .min(0.01, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El peso debe ser un número válido mayor o igual a 0",
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
    .nonempty("El archivo es requerido"),

  status: z.enum(["APPROVED", "PENDING", "DISABLED"], {
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

export const updateBoxSchema = object({
  client: string({
    required_error: "El cliente es requerido",
  }).min(1, "El cliente es requerido"),

  creases: object({
    r1: z
      .number()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Debe ser un número válido mayor o igual a 0",
      })
      .optional(),
    r2: z
      .number()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Debe ser un número válido mayor o igual a 0",
      })
      .optional(),
    r3: z
      .number()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Debe ser un número válido mayor o igual a 0",
      })
      .optional(),
  }),

  inks: object({
    gcmi_1: z.string().optional(),
    gcmi_2: z.string().optional(),
    gcmi_3: z.string().optional(),
    gcmi_4: z.string().optional(),
  }),

  weight: z
    .number()
    .min(0.01, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El peso debe ser un número válido mayor o igual a 0",
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
    })
    .optional(),

  status: z.enum(["APPROVED", "PENDING", "DISABLED"], {
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
  boxes: z.array(z.string()).optional(),
  description: string().optional(),
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
  available_meters: z
    .number()
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
  speed: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El valor debe ser un número mayor a 0",
    }),
  status: z.string(),
});

export const createPurchaseSchema = object({
  receipt_date: string({
    required_error: "La fecha de recepción es requerida",
  })
    .min(1, "La fecha de recepción es requerida")
    .refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
        return date >= sevenDaysAgo;
      },
      {
        message: "La fecha de recepción no puede ser mayor a 7 días antes",
      }
    ),

  order_number: string({
    required_error: "El número de orden es requerido",
  }).min(1, "El número de orden es requerido"),

  client: string({
    required_error: "El cliente es requerido",
  }).min(1, "El cliente es requerido"),

  symbol: string({
    required_error: "El símbolo es requerido",
  }).min(1, "El símbolo es requerido"),

  repetition_new: string({
    required_error: "Seleccione repetición o nuevo",
  }).min(1, "Seleccione repetición o nuevo"),

  type: string({
    required_error: "El tipo es requerido",
  }).min(1, "El tipo es requerido"),

  flute: string({
    required_error: "La flauta es requerida",
  }).min(1, "La flauta es requerida"),

  liner: string({
    required_error: "El liner es requerido",
  }).min(1, "El liner es requerido"),

  ect: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El valor debe ser un número mayor o igual a 0",
    }),

  number_of_inks: z
    .number(),

  quantity: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "La cantidad debe ser un número válido mayor o igual a 0",
    }),

  estimated_delivery_date: string({
    required_error: "La fecha estimada de entrega es requerida",
  })
    .min(1, "La fecha estimada de entrega es requerida")
    .refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return date >= today;
      },
      {
        message: "La fecha estimada de entrega no puede ser menor a hoy",
      }
    ),
  unit_cost: z
    .number()
    .min(0.01, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El costo unitario debe ser un número válido mayor o igual a 0",
    }),
  arapack_lot: string({
    required_error: "El lote Arapack es requerido",
  }).min(1, "El lote Arapack es requerido"),
  subtotal: z
    .number()
    .min(0.01, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El subtotal debe ser un número válido mayor o igual a 0",
    }),
  total_invoice: z
    .number()
    .min(0.01, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message:
        "El total de la factura debe ser un número válido mayor o igual a 0",
    }),
  weight: z
    .number()
    .min(0.01, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "El peso debe ser un número válido mayor o igual a 0",
    }),
  total_kilograms: z
    .number()
    .min(0.01, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message:
        "El total de kilogramos debe ser un número válido mayor o igual a 0",
    }),
  // delivered_quantity: z
  //   .number()
  //   .min(1, {
  //     message: "El valor debe ser mayor a 0",
  //   })
  //   .transform((val) => Number(val))
  //   .refine((val) => !isNaN(val) && val >= 0, {
  //     message:
  //       "La cantidad entregada debe ser un número válido mayor o igual a 0",
  //   }),
  // initial_shipping_date: string({
  //   required_error: "La fecha inicial de envío es requerida",
  // }).min(1, "La fecha inicial de envío es requerida")
  // .refine(
  //   (value) => {
  //     const date = new Date(value);
  //     const today = new Date();
  //     return date >= today;
  //   },
  //   {
  //     message: "La fecha inicial de envío no puede ser menor a hoy",
  //   }
  // ),
  // final_shipping_date: string({
  //   required_error: "La fecha final de envío es requerida",
  // }).min(1, "La fecha final de envío es requerida")
  // .refine(
  //   (value) => {
  //     const date = new Date(value);
  //     const today = new Date();
  //     return date >= today;
  //   },
  //   {
  //     message: "La fecha estimada de entrega no puede ser menor a hoy",
  //   }
  // ),
  // delivery_dates: z.array(z.string()).min(1, {
  //   message: "Ingrese al menos una fecha de entrega",
  // }),
  // missing_quantity: z
  //   .number()
  //   .min(1, {
  //     message: "El valor debe ser mayor a 0",
  //   })
  //   .transform((val) => Number(val))
  //   .refine((val) => !isNaN(val) && val >= 0, {
  //     message: "La cantidad faltante debe ser un número válido mayor o igual a 0",
  //   }),
  status: z
    .string({
      required_error: "El estado es requerido",
    })
    .min(1, "El estado es requerido"),
  comments: z.string().optional(),
  // pending_kilograms: z
  //   .number()
  //   .min(1, {
  //     message: "El valor debe ser mayor a 0",
  //   })
  //   .transform((val) => Number(val))
  //   .refine((val) => !isNaN(val) && val >= 0, {
  //     message: "Los kilogramos pendientes deben ser un número válido mayor o igual a 0",
  //   }),
  // delivery_delay_days: z
  //   .number()
  //   .min(1, {
  //     message: "El valor debe ser mayor a 0",
  //   })
  //   .transform((val) => Number(val))
  //   .refine((val) => !isNaN(val) && val >= 0, {
  //     message:
  //       "Los días de retraso deben ser un número válido mayor o igual a 0",
  //   }),
  // real_delivery_period: z
  //   .number()
  //   .min(1, {
  //     message: "El valor debe ser mayor a 0",
  //   })
  //   .transform((val) => Number(val))
  //   .refine((val) => !isNaN(val) && val >= 0, {
  //     message: "El periodo de entrega real debe ser un número válido mayor o igual a 0",
  //   }),
});

export const createShippingSchema = object({
  initial_shipping_date: string({
    required_error: "La fecha estimada de entrega es requerida",
  })
    .min(1, "La fecha estimada de entrega es requerida")
    .refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return date >= today;
      },
      {
        message: "La fecha estimada de entrega no puede ser menor a hoy",
      }
    ),
  quantity: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "La cantidad debe ser un número válido mayor o igual a 0",
    }),
  comment: z.string().optional(),
});

export const updateDeliveryInfoSchema = object({
  new_delivery_date: string().refine(
    (value) => {
      const date = new Date(value);
      const today = new Date();
      today.setDate(today.getDate() - 1);
      return date >= today;
    },
    {
      message: "La fecha estimada de entrega no puede ser menor a hoy",
    }
  ),
  new_quantity: z
    .number()
    .min(1, {
      message: "El valor debe ser mayor a 0",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "La cantidad debe ser un número válido mayor o igual a 0",
    }),
});
