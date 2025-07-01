import { fetchWildcardsSheetsBySymbol } from "@/app/lib/data";
import SheetsList from "./sheets-list";
import WildcardsList from "./wildcards-list";

export default async function WildcardsSheetsColumn({
  symbol,
}: {
  symbol: string;
}) {
  const data = symbol
    ? await fetchWildcardsSheetsBySymbol(symbol)
    : { valid_box_wildcards: [], valid_sheets: [] };

  return (
    <>
      <div>
        <h2 className="text-blue-400 font-bold text-xl mb-2">Comodines</h2>
        <WildcardsList wildcards={data.valid_box_wildcards} />
      </div>

      <div>
        <h2 className="text-blue-400 font-bold text-xl mb-2">
          Rollos seleccionados
        </h2>
        <SheetsList sheets={data.valid_sheets} />
      </div>
    </>
  );
}
