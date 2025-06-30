// app/ui/corrugadora/sheets-list.tsx
import { fetchSheetsBySymbol } from "@/app/lib/data";
import SheetRow from "./sheet-row";
import { Sheet } from "@/app/lib/definitions";

export default async function SheetsList({ symbol }: { symbol: string }) {
  if (!symbol) {
    return (
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
        >
          <li className="py-4 px-5 text-sm text-gray-500">
            Seleccione un pedido para ver los rollos compatibles.
          </li>
        </ul>
      </dd>
    );
  }

  const sheets = await fetchSheetsBySymbol(symbol);

  if (!sheets?.valid_sheets?.length) {
    return (
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
        >
          <li className="py-4 px-5 text-sm text-gray-500">
            No hay láminas disponibles para este pedido.
          </li>
        </ul>
      </dd>
    );
  }

  return (
    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <ul
        role="list"
        className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
      >
        {sheets.valid_sheets.map((sheet: Sheet, i: number) => (
          <SheetRow key={i} sheet={sheet} />
        ))}
      </ul>
    </dd>
  );
}
