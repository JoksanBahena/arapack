import { fetchFilteredSheets } from "@/app/lib/data";
import TableRow from "./table-row";

export default async function LaminasTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const data = await fetchFilteredSheets(query, currentPage);
  
  if (!data) {
    return <p>No se encontraron láminas.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Asociadas
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Ancho
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              P1
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              P2
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              P3
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ECT
            </th>
            {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((sheet) => (
            <TableRow key={sheet._id} sheet={sheet} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
