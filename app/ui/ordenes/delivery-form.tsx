"use client";
import { useState } from "react";

export default function DeliveryForm() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mt-2 mb-2 text-green-700 underline bg-transparent border-none shadow-none px-0 py-0 text-sm font-medium hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-600"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? "Ocultar formulario de envío" : "Expandir formulario de envío"}
      </button>
      <div
        className={`mt-4 border rounded-lg p-4 bg-gray-50 shadow-sm${
          show ? "" : " hidden"
        }`}
        id="shipping-form"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de envío real
            </label>
            <input
              type="date"
              name="real_delivery_date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enviado por
            </label>
            <input
              type="text"
              name="sent_by"
              placeholder="Nombre del responsable"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Método de envío
            </label>
            <input
              type="text"
              name="delivery_method"
              placeholder="Ej. Transportadora, Mensajería, etc."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comentarios de envío
            </label>
            <textarea
              name="shipping_comments"
              rows={3}
              placeholder="Observaciones o detalles relevantes..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Guardar seguimiento
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
