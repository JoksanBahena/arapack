// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

export type Box = {
  symbol: string;
  ect: number;
  liner: string;
  width: number;
  length: number;
  flute: string;
  treatment: number;
  client: string;
  creases: {
    r1?: number;
    r2?: number;
    r3?: number;
  };
  inks: {
    gcmi_1?: string;
    gcmi_2?: string;
    gcmi_3?: string;
    gcmi_4?: string;
  };
  weight: number;
  status: "APPROVED" | "PENDING" | "OBSOLETE";
  type: string;
  pdf_link: string | File[];
};

export type BoxesTable = {
  _id: string;
  symbol: string;
  client: string;
  length: number;
  width: number;
  liner: string;
  ect: number;
  creases: {
    r1: number;
    r2: number;
    r3: number;
  };
  status: "APPROVED" | "PENDING" | "OBSOLETE";
};

export type BoxForm = {
  symbol: string;
  ect: number;
  liner: string;
  width: number;
  length: number;
  flute: string;
  treatment: number;
  client: string;
  creases: {
    r1: number;
    r2: number;
    r3: number;
  };
  status: string;
  type: string;
  pdf_link: File[];
};

export type BoxField = [symbol: string];

export type Sheet = {
  roll_width: number;
  p1: number;
  p2: number;
  p3: number;
  ect: string[];
  grams: number;
  available_meters: number;
  description?: string;
  boxes?: string[];
  speed: number;
  status: boolean;
};

export type SheetsTable = {
  _id: string;
  roll_width: number;
  grams: number;
  p1: number;
  p2: number;
  p3: number;
  ect: number[];
  boxes: string[];
  status: boolean;
};

export type Purchase = {
  receipt_date: string;
  order_number: string;
  client: string;
  symbol: string;
  repetition_new: string;
  type: string;
  flute: string;
  liner: string;
  ect: number;
  number_of_inks: number;
  quantity: number;
  estimated_delivery_date: string;
  unit_cost: number;
  arapack_lot: string;
  subtotal: number;
  total_invoice: number;
  weight: number;
  total_kilograms: number;
  delivery_dates: Shipping[];
  missing_quantity: number;
  status: "ABIERTO" | "PARCIAL" | "COMPLETADO" | "CANCELADO";
  comments: string;
  pending_kilograms: number;
  delivery_delay_days: number;
  created_at: string;
};

export type PurchaseForm = {
  receipt_date: string;
  order_number: string;
  client: string;
  symbol: string;
  repetition_new: string;
  type: string;
  flute: string;
  liner: string;
  ect: number;
  number_of_inks: number;
  quantity: number;
  estimated_delivery_date: string;
  unit_cost: number;
  arapack_lot: string;
  subtotal: number;
  total_invoice: number;
  weight: number;
  total_kilograms: number;
  // delivered_quantity: number;
  // initial_shipping_date: string;
  // final_shipping_date: string;
  status: string;
  comments?: string | "";
  // delivery_delay_days: number;
};

export type PurchasesTable = {
  _id: string;
  receipt_date: string;
  order_number: string;
  client: string;
  symbol: string;
  repetition_new: string;
  quantity: number;
  estimated_delivery_date: string;
  arapack_lot: string;
  subtotal: number;
  status: "ABIERTO" | "PARCIAL" | "COMPLETADO" | "CANCELADO";
};

export type ProgramPlaningTable = {
  _id: string;
  production_runs: ProgramPlaning[];
  week_of_year: number;
};

export type ProgramPlaning = {
  processed_boxes: {
    symbol: string;
    quantity: number;
    output: number;
    arapack_lot: string;
  }[];
  refile: number;
  linear_meters: number;
  speed: number;
  treatment: number;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  sheet: {
    id: string;
    ect: number;
    roll_width: number;
    p1: number;
    p2: number;
    p3: number;
  };
};

export type Shipping = {
  initial_shipping_date: string;
  quantity: number;
  comment?: string | undefined;
  finish_shipping_date?: string | undefined;
};

export type DeliveryInfo = {
  new_delivery_date?: string;
  new_quantity?: number;
}

export type Backorder = {
  arapack_lot: string;
  estimated_delivery_date: string;
  quantity: number;
  missing_quantity: number;
  delivery_delay_days: number;
}
