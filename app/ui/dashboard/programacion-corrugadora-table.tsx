import { Fragment } from "react";

export default function CorrugadoraTable() {
  const data = [
    {
      tipo: "pedido",
      maquina: "FLEXO",
      cliente: "DEGASA",
      simbolo: "DEG CR CE-10",
      medidas: { largo: 150.3, ancho: 55.8 },
      rayados: "16.4-23-16.4",
      salen: 2,
      cantidad: 1500,
      pesoUnitario: 0.242,
      horaInicio: "08:10:00",
      horaFin: "08:24:00",
      // ... otros campos
    },
    {
      tipo: "cambio-rollos",
      motivo: "CAMBIO DE ROLLOS",
      materiales: "115 | 110 | 110 | 110",
      horaInicio: "09:40:00",
      horaFin: "09:55:00",
    },
    {
      tipo: "pedido",
      maquina: "FLEXO",
      cliente: "DEGASA",
      simbolo: "DEG CR CE-10",
      medidas: { largo: 150.3, ancho: 55.8 },
      rayados: "16.4-23-16.4",
      salen: 2,
      cantidad: 1500,
      pesoUnitario: 0.242,
      horaInicio: "08:10:00",
      horaFin: "08:24:00",
      // ... otros campos
    },
    {
      tipo: "pedido",
      maquina: "FLEXO",
      cliente: "DEGASA",
      simbolo: "DEG CR CE-10",
      medidas: { largo: 150.3, ancho: 55.8 },
      rayados: "16.4-23-16.4",
      salen: 2,
      cantidad: 1500,
      pesoUnitario: 0.242,
      horaInicio: "08:10:00",
      horaFin: "08:24:00",
      // ... otros campos
    },
    // ... más datos
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* Encabezados principales */}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Máquina
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cliente
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Símbolo
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Medidas
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Rayados
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Salen
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cantidad
            </th>
            {/* Agrega más encabezados según necesidad */}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Hora proceso
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Hora programada
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item, idx) => (
            <Fragment key={idx}>
              {item.tipo === "cambio-rollos" ? (
                // Fila de cambio de rollos
                <tr className="bg-blue-300">
                  <td colSpan={10} className="px-4 py-3 text-xs text-gray-900 text-center">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🔄</span>
                      {item.motivo} - {item.materiales}
                      <span className="ml-4">
                        <time>{item.horaInicio}</time> -{" "}
                        <time>{item.horaFin}</time>
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                // Fila normal de pedido
                <tr className="hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-900 max-w-xs whitespace-normal">
                    {item.maquina}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {item.cliente}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {item.simbolo}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {item.medidas?.largo} x {item.medidas?.ancho}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {item.rayados}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {item.salen}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {item.cantidad}
                  </td>
                  {/* Agrega más celdas según necesidad */}
                  <td className="px-4 py-3 text-xs text-gray-900">
                    <time>{item.horaInicio}</time> - <time>{item.horaFin}</time>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {/* Aquí iría la hora programada */}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
