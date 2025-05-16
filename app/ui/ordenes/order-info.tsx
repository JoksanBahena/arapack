import { Purchase } from "@/app/lib/definitions";
import { formatDateToLocal, formatNumberWithCommas } from "@/app/lib/utils";
import DeliveryForm from "./delivery-form";
import ShippingRow from "./shipping-row";

export default function OrderInfo({ data }: { data: Purchase }) {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Información de la orden
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Aquí puedes ver los detalles de la orden seleccionada.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Información general
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p className="text-gray-700">
                <strong>Fecha de recepción:</strong>{" "}
                {formatDateToLocal(data.receipt_date)}
              </p>
              <p className="text-gray-700">
                <strong>Símbolo:</strong> {data.symbol}
              </p>
              <p className="text-gray-700">
                <strong>Número de orden:</strong> {data.order_number}
              </p>
              <p className="text-gray-700">
                <strong>Cliente:</strong> {data.client}
              </p>
              <p className="text-gray-700">
                <strong>Repetición/Nuevo:</strong> {data.repetition_new}
              </p>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Especificaciones técnicas
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p className="text-gray-700">
                <strong>Tipo:</strong> {data.type}
              </p>
              <p className="text-gray-700">
                <strong>Flauta:</strong> {data.flute}
              </p>
              <p className="text-gray-700">
                <strong>Liner:</strong> {data.liner}
              </p>
              <p className="text-gray-700">
                <strong>ECT:</strong> {data.ect}
              </p>
              <p className="text-gray-700">
                <strong>Número de tintas:</strong> {data.number_of_inks}
              </p>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Producción y envío
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p className="text-gray-700">
                <strong>Cantidad:</strong>{" "}
                {formatNumberWithCommas(data.quantity)}{" "}
                <span className="text-sm text-gray-500">pzas.</span>
              </p>
              <p className="text-gray-700">
                <strong>Fecha de entrega estimada:</strong>{" "}
                {formatDateToLocal(data.estimated_delivery_date)}
                {data.estimated_delivery_date &&
                  new Date(data.estimated_delivery_date) < new Date() && (
                    <span className="ml-2 inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">
                      Entrega retrasada
                    </span>
                  )}
              </p>
              {data.missing_quantity > 0 && <DeliveryForm missing_quantity={data.missing_quantity} arapack_lot={data.arapack_lot} />}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Lista de envíos
            </dt>
            {data.delivery_dates.length > 0 ? (
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  {data.delivery_dates.map((shipp, index) => (
                    <ShippingRow key={index} shipping={shipp} index_list={index} arapack_lot={data.arapack_lot} />
                  ))}
                </ul>
              </dd>
            ) : (
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <p className="text-gray-700">
                  No hay envíos registrados para esta orden.
                </p>
              </dd>
            )}
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Información financiera
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p className="text-gray-700">
                <strong>Precio unitario:</strong> ${data.unit_cost}{" "}
                <span className="text-sm">MXN</span>{" "}
                <span className="text-sm text-gray-500">c/pza.</span>
              </p>
              <p className="text-gray-700">
                <strong>Lote de Arapack:</strong> {data.arapack_lot}
              </p>
              <p className="text-gray-700">
                <strong>Subtotal:</strong> $
                {formatNumberWithCommas(data.subtotal)}{" "}
                <span className="text-sm">MXN</span>{" "}
                <span className="text-xs text-gray-500">(antes de IVA)</span>
              </p>
              <p className="text-gray-700">
                <strong>Total factura:</strong> $
                {formatNumberWithCommas(data.total_invoice)}{" "}
                <span className="text-sm">MXN</span>
              </p>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Seguimiento/Envío
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p className="text-gray-700">
                <strong>Peso x pieza:</strong> {data.weight}{" "}
                <span className="text-sm text-gray-500">g.</span>
              </p>
              <p className="text-gray-700">
                <strong>Total peso:</strong>{" "}
                {formatNumberWithCommas(data.total_kilograms)}{" "}
                <span className="text-sm text-gray-500">kg.</span>
              </p>
              <p className="text-gray-700">
                <strong>Estado del envío:</strong> {data.status}
              </p>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Comentarios</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p className="text-gray-700">
                {data.comments ? (
                  data.comments
                ) : (
                  <span className="text-sm text-gray-500">
                    No hay comentarios para esta orden.
                  </span>
                )}
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
