// purchase-row.tsx
import { Purchase } from "@/app/lib/definitions";
import clsx from "clsx";          // o usa string interpolation si prefieres

interface RowProps {
  purchase: Purchase;
  selected: boolean;
  onSelect: (symbol: string, arapack_lot: string) => void;
}

export default function PurchaseRow({ purchase, selected, onSelect }: RowProps) {
  return (
    <li
      role="button"
      aria-selected={selected}
      onClick={() => onSelect(purchase.symbol, purchase.arapack_lot)}
      className={clsx(
        "py-4 pr-5 pl-4 text-sm/6 cursor-pointer transition-colors select-none",
        selected
          ? "bg-blue-100"  // estilo de seleccionado
          : "hover:bg-gray-50"
      )}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex w-full md:w-0 flex-1 items-center">
          <div className="flex flex-col md:flex-row md:min-w-0 flex-1 gap-1 md:gap-2">
            <span className="truncate font-medium text-xs">
              {purchase.client}
            </span>
          </div>
        </div>
      </div>

      {purchase.symbol}

      <div className="mt-2 text-gray-600 text-sm">
        Lote de Arapack: {purchase.arapack_lot}
      </div>
    </li>
  );
}
