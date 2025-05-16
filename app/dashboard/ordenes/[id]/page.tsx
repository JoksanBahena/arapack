import { fetchPurchaseById } from "@/app/lib/data";
import { formatDateToLocal, formatNumberWithCommas } from "@/app/lib/utils";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import DeliveryForm from "@/app/ui/ordenes/delivery-form";
import { PaperClipIcon } from "@heroicons/react/24/outline";

export default async function Page(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const params = await props.params;
  const data = await fetchPurchaseById(params.id);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/ordenes", label: "Órdenes" },
          {
            label: `${data.arapack_lot}`,
            href: `/dashboard/ordenes/${data.arapack_lot}`,
            active: true,
          },
        ]}
      />
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
                <DeliveryForm />
              </dd>
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
              <dt className="text-sm/6 font-medium text-gray-900">
                Comentarios
              </dt>
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
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Attachments
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-gray-400"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          resume_back_end_developer.pdf
                        </span>
                        <span className="shrink-0 text-gray-400">2.4mb</span>
                      </div>
                    </div>
                    <div className="ml-4 shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-gray-400"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          coverletter_back_end_developer.pdf
                        </span>
                        <span className="shrink-0 text-gray-400">4.5mb</span>
                      </div>
                    </div>
                    <div className="ml-4 shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
