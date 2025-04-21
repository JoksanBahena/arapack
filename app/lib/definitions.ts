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
    r1: number;
    r2: number;
    r3: number;
  };
  inks: {
    gcmi_1: string;
    gcmi_2?: string;
    gcmi_3?: string;
    gcmi_4?: string;
  }
  weight: number;
  status: "approved" | "pending";
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
  status: "approved" | "pending";
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

export type BoxField = [
  symbol: string,
]

export type Sheet = {
  boxes: string[];
  description: string;
  ect: string[];
  grams: number;
  p1: number;
  p2: number;
  p3: number;
  roll_width: number;
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
  delivered_quantity: number;
  initial_shipping_date: string;
  final_shipping_date: string;
  delivery_dates: string[];
  missing_quantity: number;
  status: string;
  comments: string;
  pending_kilograms: number;
  delivery_delay_days: number;
  real_delivery_period: number;
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
}

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
}
