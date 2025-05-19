"use client";
import { Backorder } from "@/app/lib/definitions";
import { formatDateToLocal } from "@/app/lib/utils";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Backorders({
  backorders,
}: {
  backorders: Backorder[];
}) {
  const router = useRouter();
  const handleGoToOrder = (arapack_lot: string) => {
    router.push(`/dashboard/ordenes/${arapack_lot}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-semibold">Órdenes Retrasadas</h3>
        </div>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
          {backorders.length} pendientes
        </span>
      </div>

      {backorders.length === 0 ? (
        <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg border border-green-100">
          <span className="text-green-700 font-semibold">
            No hay ningun pendiente
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {backorders.map((order, index) => (
            <div
              key={index}
              className="p-4 bg-red-50 rounded-lg border border-red-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <button
                    type="button"
                    className="text-blue-600 underline hover:text-blue-800 focus:outline-none"
                    onClick={() => handleGoToOrder(order.arapack_lot)}
                  >
                    {order.arapack_lot}
                  </button>
                  <p className="text-sm text-gray-600">
                    Retraso: {order.delivery_delay_days} días
                  </p>
                </div>
                <div className="text-right">
                  {order.missing_quantity > 0 && (
                    <p className="text-xl font-bold text-red-600">
                      {new Intl.NumberFormat("es-MX", {
                        style: "decimal",
                        maximumFractionDigits: 0,
                      }).format(order.missing_quantity)}{" "} de{" "}
                      {new Intl.NumberFormat("es-MX", {
                        style: "decimal",
                        maximumFractionDigits: 0,
                      }).format(order.quantity)}{" "}
                      <span className="text-sm text-red-500">pzas. faltantes</span>
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    {formatDateToLocal(order.estimated_delivery_date)}
                  </p>
                </div>
              </div>

              {order.missing_quantity > 0 ? (
                <div className="mt-2 h-2 bg-red-200 rounded-full">
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{
                      width: `${Math.min(
                        (order.missing_quantity / order.quantity) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              ) : (
                <p className="text-md font-bold text-red-500 px-0 py-1">
                  Falta marcar como entregado los envíos de esta orden.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
