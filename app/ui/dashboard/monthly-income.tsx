import {
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function MonthlyIncome({
  monthlyInvoice,
}: {
  monthlyInvoice: number;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
        <h3 className="text-xl font-semibold">Facturación Mensual</h3>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold text-gray-900">
          {new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
          }).format(monthlyInvoice)}
          <span className="text-sm text-gray-500"> MXN</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">Total acumulado este mes</p>
      </div>
    </div>
  );
}
