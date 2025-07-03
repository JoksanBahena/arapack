import { Purchase } from "@/app/lib/definitions";

interface Program {
  id: number;
  arapack_lot: string;
  symbol: string;
}

export default function ProgramRow({ purchase }: { purchase: Program }) {
  return (
    <li
      role="button"
      className={
        "py-4 pr-5 pl-4 text-sm/6 cursor-pointer transition-colors select-none"
      }
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex w-full md:w-0 flex-1 items-center">
          <div className="flex flex-col md:flex-row md:min-w-0 flex-1 gap-1 md:gap-2">
            <span className="truncate font-medium text-xs">
              {purchase.id}
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
