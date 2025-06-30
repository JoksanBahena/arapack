import {
  fetchBackorders,
  fetchMonthlyInvoice,
  fetchMonthlyKilograms,
} from "../lib/data";
import Backorders from "../ui/dashboard/backorders";
import MonthlyIncome from "../ui/dashboard/monthly-income";
import MonthlyKilograms from "../ui/dashboard/monthly-kilograms";

export default async function Page() {
  const [monthlyInvoice, backorders, monthlyKilograms] = await Promise.all([
    await fetchMonthlyInvoice(),
    await fetchBackorders(),
    await fetchMonthlyKilograms(),
    
  ]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta de Facturación Mensual */}
        <MonthlyIncome monthlyInvoice={monthlyInvoice} />

        {/* Tarjeta de Backorders */}
        <MonthlyKilograms total_kilograms={monthlyKilograms} />
      </div>
      <div className="mt-6">
        {/* Tarjeta de Backorders */}
        <Backorders backorders={backorders} />
      </div>
    </div>
  );
}
