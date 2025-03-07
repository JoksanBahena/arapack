export default function CajasTable() {
  const data = [
    {
      id: "001",
      simbolo: "DEG CR CE-10",
      cliente: "DEGASA",
      medidas: "150cm x 55",
      liner: "KRAFT",
      ect: 21,
      rayados: "16.4-23-16.4",
      status: "Activo",
    },
    {
      id: "002",
      simbolo: "DEG CR CE-10",
      cliente: "DEGASA",
      medidas: "150cm x 55",
      liner: "KRAFT",
      ect: 21,
      rayados: "16.4-23-16.4",
      status: "Activo",
    },
    // Agrega más filas según sea necesario
  ];

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
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-xs text-gray-900 max-w-xs whitespace-normal">
                {item.simbolo}
              </td>
              <td className="px-4 py-3 text-xs text-gray-900">
                {item.medidas}
              </td>
              <td className="px-4 py-3 text-xs text-gray-900">
                {item.cliente}
              </td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.liner}</td>
              <td className="px-4 py-3 text-xs text-gray-900">{item.ect}</td>
              <td className="px-4 py-3 text-xs text-gray-900">
                {item.rayados}
              </td>
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
