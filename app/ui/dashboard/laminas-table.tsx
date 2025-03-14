export default function LaminasTable() {
  const data = [
    {
      id: "001",
      asociadas:
        "DEG CR N (VDAS), DEG CR No.228, DEG CR No.14 (VDAS), DEG CR CE-06 (PDA)",
      ancho: 115,
      p1: 110,
      p2: 19,
      p3: "-", // Valor faltante en tu ejemplo
      ect: "-", // Valor faltante en tu ejemplo
      status: "Activo",
    },
    {
      id: "002",
      asociadas: "N/A",
      ancho: 160,
      p1: 140,
      p2: 140,
      p3: 140,
      ect: "32,35",
      status: "Activo",
    },
    {
      id: "003",
      asociadas: "N/A",
      ancho: 140,
      p1: 140,
      p2: 140,
      p3: 140,
      ect: "32,35",
      status: "Desactivado",
    },
  ];

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
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 transition-colors">
              <td className="px-4 py-3 text-xs text-gray-900 max-w-xs whitespace-normal">
                {item.asociadas}
              </td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.ancho} cm</td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.p1}</td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.p2}</td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.p3}</td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.ect}</td>
              <td className="px-4 py-3">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
