import { fetchBackorders, fetchMonthlyInvoice } from "../lib/data";
import Backorders from "../ui/dashboard/backorders";
import MonthlyIncome from "../ui/dashboard/monthly-income";

export default async function Page() {
  const [monthlyInvoice, backorders] = await Promise.all([
    await fetchMonthlyInvoice(),
    await fetchBackorders(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Tarjeta de Facturación Mensual */}
      <MonthlyIncome monthlyInvoice={monthlyInvoice} />

      {/* Tarjeta de Backorders */}
      <Backorders backorders={backorders} />
    </div>
  );
}
