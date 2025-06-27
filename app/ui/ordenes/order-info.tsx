"use client";
import { Purchase } from "@/app/lib/definitions";
import { formatDateToLocal } from "@/app/lib/utils";
import DeliveryForm from "./delivery-form";
import ShippingRow from "./shipping-row";
import { useRouter } from "next/navigation";
import UpdateDeliveryInfoForm from "./update-delivery-info-form";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ChangeStatusPurchase } from "./buttons";
import { showConfirmDialog, Toast } from "@/app/lib/alerts";
import { changeStatusPurchase } from "@/app/lib/data";

export default function OrderInfo({ data }: { data: Purchase }) {
  const router = useRouter();

  const handleGoToBox = () => {
    router.push(`/dashboard/cajas/${data.symbol}`);
  };

  const handleChangeStatus = async (status: string) => {
    showConfirmDialog(
      `¿Está seguro de que desea marcar este pedido como ${status}?`,
      status === "CANCELADA"
        ? "Esta acción no se puede deshacer."
        : "El estado del pedido cambiará a " + status,
      "Confirmar",
      "Cancelar",
      async () => {
        const response = await changeStatusPurchase(data.arapack_lot, status);
        if (response.status === 200) {
          router.refresh();
          Toast.fire({
            icon: "success",
            title: "Pedido marcado como " + status,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Error al marcar el pedido como " + status,
          });
        }
      }
    );
  };

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
                <strong>Símbolo:</strong>{" "}
                <button
                  type="button"
                  className="text-blue-600 underline hover:text-blue-800 focus:outline-none"
                  onClick={handleGoToBox}
                >
                  {data.symbol}
                </button>
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
                {new Intl.NumberFormat("es-MX", {
                  style: "decimal",
                  maximumFractionDigits: 0,
                }).format(data.quantity)}{" "}
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
              {data.status !== "CANCELADO" && (
                <>
                  {data.status !== "COMPLETADO" && (
                    <UpdateDeliveryInfoForm
                      arapack_lot={data.arapack_lot}
                      data={{
                        estimated_delivery_date: data.estimated_delivery_date,
                        quantity: data.quantity,
                      }}
                    />
                  )}
                  {data.missing_quantity > 0 ? (
                    <DeliveryForm
                      missing_quantity={data.missing_quantity}
                      arapack_lot={data.arapack_lot}
                    />
                  ) : (
                    <span className="items-center rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                      Se enviaron todas las piezas
                    </span>
                  )}
                </>
              )}
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
                    <ShippingRow
                      key={index}
                      shipping={shipp}
                      index_list={index}
                      arapack_lot={data.arapack_lot}
                    />
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
                <strong>Precio unitario:</strong>{" "}
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                }).format(data.unit_cost)}{" "}
                <span className="text-sm">MXN</span>{" "}
                <span className="text-sm text-gray-500">c/pza.</span>
              </p>
              <p className="text-gray-700">
                <strong>Lote de Arapack:</strong> {data.arapack_lot}
              </p>
              <p className="text-gray-700">
                <strong>Subtotal:</strong>{" "}
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                }).format(data.subtotal)}{" "}
                <span className="text-sm">MXN</span>{" "}
                <span className="text-xs text-gray-500 italic">
                  (antes de IVA)
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Total factura:</strong>{" "}
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                }).format(data.total_invoice)}{" "}
                <span className="text-sm">MXN</span>
              </p>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Seguimiento</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p className="text-gray-700">
                <strong>Peso x pieza:</strong> {data.weight}{" "}
                <span className="text-sm text-gray-500">g.</span>
              </p>
              <p className="text-gray-700">
                <strong>Total peso:</strong>{" "}
                {new Intl.NumberFormat("es-MX", {
                  style: "decimal",
                  maximumFractionDigits: 2,
                }).format(data.total_kilograms)}{" "}
                <span className="text-sm text-gray-500">kg.</span>
              </p>
              <p className="text-gray-700">
                <strong>Estado del pedido:</strong>{" "}
                <StatusBadge status={data.status} />
              </p>
              {data.status !== "CANCELADO" && data.status !== "COMPLETADO" && (
                <>
                  {data.status === "PARCIAL" ? (
                    <ChangeStatusPurchase
                      handleAction={handleChangeStatus}
                      status={"APROBADO"}
                    />
                  ) : (
                    <ChangeStatusPurchase
                      handleAction={handleChangeStatus}
                      status={"PARCIAL"}
                    />
                  )}
                  <ChangeStatusPurchase
                    handleAction={handleChangeStatus}
                    status={"CANCELADO"}
                  />
                </>
              )}
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

const StatusBadge = ({ status }: { status: Purchase["status"] }) => {
  const statusStyles = {
    ABIERTO: "bg-green-100 text-green-800",
    PARCIAL: "bg-yellow-100 text-yellow-800",
    CANCELADO: "bg-red-100 text-red-800",
    COMPLETADO: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}
    >
      {status === "ABIERTO" && <CheckCircleIcon className="w-4 h-4 mr-1" />}
      {status === "PARCIAL" && <ClockIcon className="w-4 h-4 mr-1" />}
      {status === "COMPLETADO" && <CheckCircleIcon className="w-4 h-4 mr-1" />}
      {status === "CANCELADO" && <XCircleIcon className="w-4 h-4 mr-1" />}
      {status === "ABIERTO" && "Abierto"}
      {status === "PARCIAL" && "Parcial"}
      {status === "COMPLETADO" && "Completado"}
      {status === "CANCELADO" && "Cancelado"}
    </span>
  );
};
