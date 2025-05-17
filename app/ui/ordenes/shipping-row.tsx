"use client";
import { showConfirmDialog, Toast } from "@/app/lib/alerts";
import { completeShipping } from "@/app/lib/data";
import { Shipping } from "@/app/lib/definitions";
import { formatDateToLocal, formatNumberWithCommas } from "@/app/lib/utils";
import { LocalShippingOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function ShippingRow({
  shipping,
  index_list,
  arapack_lot,
}: {
  shipping: Shipping;
  index_list: number;
  arapack_lot: string;
}) {
  const router = useRouter();
  const handleClick = async () => {
    showConfirmDialog(
      "¿Está seguro de que desea marcar este envío como entregado?",
      "Esta acción no se puede deshacer.",
      "Marcar como entregado",
      "Cancelar",
      async () => {
        const response = await completeShipping(arapack_lot, index_list);
        if (response.status === 200) {
          router.refresh();
          Toast.fire({
            icon: "success",
            title: "Envío marcado como entregado",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Error al marcar el envío como entregado",
          });
        }
      }
    );
  };
  
  return (
    <li className="py-4 pr-5 pl-4 text-sm/6">
      {/* Fila principal */}
      <div className="flex items-center justify-between">
        <div className="flex w-0 flex-1 items-center">
          <LocalShippingOutlined
            aria-hidden="true"
            className="size-5 shrink-0 text-gray-400"
          />
          <div className="ml-4 flex min-w-0 flex-1 gap-2">
            <span className="truncate font-medium">
              Se envió: {formatDateToLocal(shipping.initial_shipping_date)}
            </span>
            <span className="shrink-0 text-gray-400">
              {formatNumberWithCommas(shipping.quantity)} pzas.
            </span>
          </div>
        </div>
        {shipping.finish_shipping_date && (
          <div className="ml-4 shrink-0">
            <span className="text-green-700">
              (Entregado: {formatDateToLocal(shipping.finish_shipping_date)})
            </span>
          </div>
        )}
        {!shipping.finish_shipping_date && (
          <div className="ml-4 shrink-0">
            <button
              type="button"
              onClick={handleClick}
              className="font-medium text-indigo-600 hover:text-indigo-500 bg-transparent border-none p-0 cursor-pointer"
            >
              Marcar como entregado
            </button>
          </div>
        )}
      </div>
      {shipping.comment && (
        <div className="mt-2 ml-9 text-gray-600 text-sm italic">
          {shipping.comment}
        </div>
      )}
    </li>
  );
}
