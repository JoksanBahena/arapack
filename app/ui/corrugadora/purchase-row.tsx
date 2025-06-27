import { Purchase } from "@/app/lib/definitions";

export default function PurchaseRow({ purchase }: { purchase: Purchase }) {
  return (
    <li className="py-4 pr-5 pl-4 text-sm/6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex w-full md:w-0 flex-1 items-center">
          <div className="flex flex-col md:flex-row md:min-w-0 flex-1 gap-1 md:gap-2">
            <span className="truncate font-medium text-xs">{purchase.client}</span>
            {/* <span className="shrink-0 text-gray-400">
              {new Intl.NumberFormat("es-MX", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(shipping.quantity)}{" "}
              pzas.
            </span> */}
          </div>
        </div>

        {/* Parte derecha: entregado o botón */}
        {/* {shipping.finish_shipping_date ? (
          <div className="shrink-0 text-green-700">
            (Entregado: {formatDateToLocal(shipping.finish_shipping_date)})
          </div>
        ) : (
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleClick}
              className="text-indigo-600 hover:text-indigo-500 text-sm bg-transparent border-none p-0 cursor-pointer"
            >
              Marcar como entregado
            </button>
          </div>
        )} */}
      </div>
      {purchase.symbol}
      <div className="mt-2 text-gray-600 text-sm">
        Lote de Arapack: {purchase.arapack_lot}
      </div>
    </li>
  );
}
