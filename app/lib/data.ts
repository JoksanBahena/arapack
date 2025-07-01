// import postgres from "postgres";
import {
  Box,
  BoxesTable,
  BoxField,
  BoxForm,
  CustomerField,
  CustomersTableType,
  DeliveryInfo,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  ProgramPlaningTable,
  Purchase,
  PurchaseForm,
  PurchasesTable,
  Revenue,
  Sheet,
  SheetsTable,
  Shipping,
} from "./definitions";
import { formatCurrency } from "./utils";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
// const URL_BASE = process.env.URL_BASE;
const URL_BASE = "http://localhost:8000";

// export async function fetchRevenue() {
//   try {
//     // Artificially delay a response for demo purposes.
//     // Don't do this in production :)

//     // console.log('Fetching revenue data...');
//     // await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<Revenue[]>`SELECT * FROM revenue`;

//     // console.log('Data fetch completed after 3 seconds.');

//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

// export async function fetchLatestInvoices() {
//   try {
//     const data = await sql<LatestInvoiceRaw[]>`
//       SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       ORDER BY invoices.date DESC
//       LIMIT 5`;

//     const latestInvoices = data.map((invoice) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch the latest invoices.");
//   }
// }

// export async function fetchCardData() {
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0][0].count ?? "0");
//     const numberOfCustomers = Number(data[1][0].count ?? "0");
//     const totalPaidInvoices = formatCurrency(data[2][0].paid ?? "0");
//     const totalPendingInvoices = formatCurrency(data[2][0].pending ?? "0");

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch card data.");
//   }
// }

// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(
//   query: string,
//   currentPage: number
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const invoices = await sql<InvoicesTable[]>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return invoices;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch invoices.");
//   }
// }

// export async function fetchInvoicesPages(query: string) {
//   try {
//     const data = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch total number of invoices.");
//   }
// }

// export async function fetchInvoiceById(id: string) {
//   try {
//     const data = await sql<InvoiceForm[]>`
//       SELECT
//         invoices.id,
//         invoices.customer_id,
//         invoices.amount,
//         invoices.status
//       FROM invoices
//       WHERE invoices.id = ${id};
//     `;

//     const invoice = data.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       amount: invoice.amount / 100,
//     }));

//     return invoice[0];
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch invoice.");
//   }
// }

// export async function fetchCustomers() {
//   try {
//     const customers = await sql<CustomerField[]>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `;

//     return customers;
//   } catch (err) {
//     console.error("Database Error:", err);
//     throw new Error("Failed to fetch all customers.");
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<CustomersTableType[]>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error("Database Error:", err);
//     throw new Error("Failed to fetch customer table.");
//   }
// }

export async function fetchBoxes(): Promise<Box[]> {
  try {
    const response = await fetch(`${URL_BASE}/boxes/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch boxes.");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data: Box[] = await response.json();
    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch boxes.");
  }
}

export async function fetchFilteredBoxes(
  query: string,
  currentPage: number
): Promise<BoxesTable[]> {
  try {
    const response = await fetch(
      `${URL_BASE}/boxes/getFilteredBoxes?query=${query}&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch boxes.");
  }
}

export async function fetchBoxesPages(query: string) {
  try {
    const response = await fetch(`${URL_BASE}/boxes/getPages?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch total number of boxes.");
  }
}

export async function fetchBoxBySymbol(symbol: string) {
  try {
    const response = await fetch(`${URL_BASE}/boxes/getBySymbol/${symbol}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch box.");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch box.");
  }
}

export async function fetchBoxesSymbols() {
  try {
    const response = await fetch(`${URL_BASE}/boxes/getSymbols`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch boxes.");

    const data: string[] = await response.json();
    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch boxes.");
  }
}

export async function createBox(data: Box) {
  try {
    const formData = new FormData();

    formData.append("symbol", data.symbol);
    formData.append("ect", data.ect.toString());
    formData.append("liner", data.liner);
    formData.append("width", data.width.toString());
    formData.append("length", data.length.toString());
    formData.append("flute", data.flute);
    formData.append("treatment", data.treatment.toString());
    formData.append("client", data.client);
    formData.append("box_status", data.status);
    formData.append("box_type", data.type);

    formData.append("crease1", (data.creases.r1 ?? 0).toString());
    formData.append("crease2", (data.creases.r2 ?? 0).toString());
    formData.append("crease3", (data.creases.r3 ?? 0).toString());

    formData.append("gcmi_1", (data.inks.gcmi_1 ?? "").toString());
    formData.append("gcmi_2", (data.inks.gcmi_2 ?? "").toString());
    formData.append("gcmi_3", (data.inks.gcmi_3 ?? "").toString());
    formData.append("gcmi_4", (data.inks.gcmi_4 ?? "").toString());
    formData.append("weight", data.weight.toString());

    if (data.pdf_link.length > 0) {
      formData.append("file", data.pdf_link[0]);
    }

    const response = await fetch(`${URL_BASE}/boxes/create`, {
      method: "POST",
      body: formData,
    });
    console.log("Response:", response);

    if (!response.ok) throw new Error("Failed to create box.");
    return await response;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create box.");
  }
}

export async function editBox(data: Box, id: string) {
  try {
    const formData = new FormData();

    formData.append("symbol", data.symbol);
    formData.append("ect", data.ect.toString());
    formData.append("liner", data.liner);
    formData.append("width", data.width.toString());
    formData.append("length", data.length.toString());
    formData.append("flute", data.flute);
    formData.append("treatment", data.treatment.toString());
    formData.append("client", data.client);
    formData.append("box_status", data.status);
    formData.append("box_type", data.type);

    formData.append("crease1", (data.creases.r1 ?? 0).toString());
    formData.append("crease2", (data.creases.r2 ?? 0).toString());
    formData.append("crease3", (data.creases.r3 ?? 0).toString());

    formData.append("gcmi_1", (data.inks.gcmi_1 ?? "").toString());
    formData.append("gcmi_2", (data.inks.gcmi_2 ?? "").toString());
    formData.append("gcmi_3", (data.inks.gcmi_3 ?? "").toString());
    formData.append("gcmi_4", (data.inks.gcmi_4 ?? "").toString());
    formData.append("weight", data.weight.toString());

    if (data.pdf_link.length > 0) {
      formData.append("pdf_file", data.pdf_link[0]);
    }

    const response = await fetch(`${URL_BASE}/boxes/update/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to edit box.");
    return await response;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to edit box.");
  }
}

export async function fetchFilteredSheets(
  query: string,
  currentPage: number
): Promise<SheetsTable[]> {
  try {
    const response = await fetch(
      `${URL_BASE}/sheets/getFilteredSheets?query=${query}&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch sheets.");
  }
}

export async function fetchWildcardsSheetsBySymbol(symbol: string) {
  try {
    const response = await fetch(`${URL_BASE}/selections/filter/${symbol}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch wildcards sheets.");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch sheets.");
  }
}

export async function fetchSheetsPages(query: string) {
  try {
    const response = await fetch(`${URL_BASE}/sheets/getPages?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch total number of sheets.");
  }
}

export async function fetchSheetById(id: string) {
  try {
    const response = await fetch(`${URL_BASE}/sheets/getById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch sheet.");
    const data: Sheet = await response.json();
    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch sheet.");
  }
}

export async function createSheet(data: Sheet) {
  try {
    const response = await fetch(`${URL_BASE}/sheets/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create sheet.");
    return await response;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create sheet.");
  }
}

export async function editSheet(data: Sheet, id: string) {
  try {
    const response = await fetch(`${URL_BASE}/sheets/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to edit sheet.");
    return await response;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to edit sheet.");
  }
}

export async function fetchFilteredPurchasesByStatus(): Promise<Purchase[]> {
  try {
    const response = await fetch(`${URL_BASE}/purchases/getFilterPurchasesByStatus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch purchases by status.");
    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch purchases by status.");
  }
}

export async function fetchFilteredPurchases(
  query: string,
  currentPage: number
): Promise<PurchasesTable[]> {
  try {
    const response = await fetch(
      `${URL_BASE}/purchases/getFilteredPurchases?query=${query}&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch purchases.");
  }
}

export async function fetchPurchasesPages(query: string) {
  try {
    const response = await fetch(
      `${URL_BASE}/purchases/getPages?query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch total number of purchases.");
  }
}

export async function fetchPurchaseById(arapack_lot: string) {
  try {
    const response = await fetch(
      `${URL_BASE}/purchases/getByArapackLot?arapack_lot=${arapack_lot}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch purchase.");
    const data: Purchase = await response.json();
    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch purchase.");
  }
}

export async function createPurchase(data: PurchaseForm) {
  try {
    const response = await fetch(`${URL_BASE}/purchases/create_with_ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create purchase.");
    return await response;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create purchase.");
  }
}

export async function createShipping(data: Shipping, arapack_lot: string) {
  try {
    const response = await fetch(
      `${URL_BASE}/purchases/createShipping/${arapack_lot}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to create shipping.");
    return await response;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create shipping.");
  }
}

export async function completeShipping(arapack_lot: string, index: number) {
  try {
    const response = await fetch(
      `${URL_BASE}/purchases/completeShipping/${arapack_lot}?index=${index}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to complete shipping.");
    return await response;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to complete shipping.");
  }
}

export async function updateDeliveryInfo(
  arapack_lot: string,
  data: DeliveryInfo
) {
  try {
    const response = await fetch(
      `${URL_BASE}/purchases/update_delivery_date/${arapack_lot}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to update delivery info.");
    return await response;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to update delivery info.");
  }
}

export async function changeStatusPurchase(
  arapack_lot: string,
  newStatus: string
) {
  try {
    const response = await fetch(
      `${URL_BASE}/purchases/changeStatus/${arapack_lot}?new_status=${newStatus}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to change status.");
    return await response;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to change status.");
  }
}

export async function fetchProgramPlaning(
  week: number
): Promise<ProgramPlaningTable> {
  try {
    const response = await fetch(`${URL_BASE}/program/getByWeek/${week}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch program planing.");
  }
}

export async function fetchMonthlyInvoice() {
  try {
    const response = await fetch(`${URL_BASE}/purchases/getMonthlyInvoice`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch monthly invoince.");
  }
}

export async function fetchBackorders() {
  try {
    const response = await fetch(`${URL_BASE}/purchases/getBackorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch backorders.");
  }
}

export async function fetchMonthlyKilograms() {
  try {
    const response = await fetch(`${URL_BASE}/purchases/getMonthlyKilograms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch monthly kilograms.");
  }
}
