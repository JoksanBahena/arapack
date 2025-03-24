import { fetchFilteredSheets } from "@/app/lib/data";

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
          {data.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100 transition-colors">
              <td className="px-4 py-3 text-xs text-gray-900 max-w-xs whitespace-normal">
                {item.boxes.map((box) => box.symbol).join(", ")}
              </td>
              <td className="px-4 py-3 text-xs text-gray-900">
                {item.roll_width} cm
              </td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.p1}</td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.p2}</td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.p3}</td>
              <td className="px-4 py-3 text-xs text-gray-900">
                {item.ect.map((e) => e).join(" - ")}
              </td>
              {/* <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${
                      item.status === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {item.status}
                </span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
