import { fetchFilteredBoxes } from "@/app/lib/data";
import { BoxesTable } from "@/app/lib/definitions";

export default async function CajasTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const data = await fetchFilteredBoxes(query, currentPage);

  if (!data) {
    return <p>No se encontraron cajas.</p>;
  }
  
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Símbolo
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cliente
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Medidas
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Liner
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ECT
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Rayados
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((box: BoxesTable) => (
            <tr key={box._id} className="hover:bg-gray-100 transition-colors">
              <td className="px-4 py-3 text-xs text-gray-900 max-w-xs whitespace-normal">
                {box.symbol}
              </td>
              <td className="px-4 py-3 text-xs text-gray-900">{box.client}</td>
              <td className="px-4 py-3 text-xs text-gray-900">
                {box.length}cm x {box.width}cm
              </td>
              <td className="px-4 py-3 text-xs text-gray-900">{box.liner}</td>
              <td className="px-4 py-3 text-xs text-gray-900">{box.ect}</td>
              <td className="px-4 py-3 text-xs text-gray-900">
                {box.creases.r1} - {box.creases.r2} - {box.creases.r3}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${
                      box.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {box.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
