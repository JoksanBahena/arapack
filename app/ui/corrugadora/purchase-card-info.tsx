"use client";

import { useState } from "react";
import { Purchase } from "@/app/lib/definitions";
import { formatDateToLocal } from "@/app/lib/utils";

export default function PurchaseCardInfo({ purchase }: { purchase: Purchase }) {
  const [procesarParcial, setProcesarParcial] = useState(false);
  const [cantidadParcial, setCantidadParcial] = useState(purchase.quantity);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProcesarParcial(e.target.checked);
    if (!e.target.checked) {
      setCantidadParcial(purchase.quantity);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Información de la Compra</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Símbolo</dt>
            <dd className="mt-1 text-sm text-gray-900">{purchase.symbol}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Fecha estimada de entrega
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDateToLocal(purchase.estimated_delivery_date)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="text-sm space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Procesamiento</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={procesarParcial}
              onChange={handleCheckboxChange}
              className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-gray-100"
            />
            Procesar solo una parte
          </label>

          {procesarParcial && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Cantidad a procesar:</span>
              <input
                type="number"
                min={1}
                max={purchase.quantity}
                value={cantidadParcial}
                onChange={(e) => setCantidadParcial(Number(e.target.value))}
                className="w-24 px-2 py-1 border rounded text-right"
              />
              <span className="text-gray-400">/ {purchase.quantity}</span>
            </div>
          )}

          {!procesarParcial && (
            <p className="font-bold text-green-600">
              Se procesará todo el pedido:{" "}
              {new Intl.NumberFormat("es-MX", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(purchase.quantity)}{" "}
              pzas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
