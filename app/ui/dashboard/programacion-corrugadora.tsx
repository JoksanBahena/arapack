"use client";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function CorrugadoraTable() {
  const data = [
    {
      idCorrida: "1",
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
      idCorrida: "2",
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
      idCorrida: "2",
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
      idCorrida: "3",
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
      idCorrida: "3",
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
  ];

  let currentCorrida = 0;
  const router = useRouter();

  const handleDetails = (idCorrida: string) => {
    router.push(`/dashboard/corrugadora/${idCorrida}`);
  };

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
          {data.map((item, idx) => {
            const showSeparator =
              item.idCorrida && Number(item.idCorrida) !== currentCorrida;
            currentCorrida = Number(item.idCorrida) || currentCorrida;
            return (
              <Fragment key={idx}>
                {showSeparator && (
                  <tr className="h-4 bg-gray-100">
                    <td colSpan={10} className="p-0"></td>
                  </tr>
                )}
                {item.tipo === "cambio-rollos" ? (
                  // Fila de cambio de rollos
                  <tr className="bg-blue-300">
                    <td
                      colSpan={10}
                      className="px-4 py-3 text-xs text-gray-900 text-center"
                    >
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
                  <tr
                    className="hover:bg-gray-100 transition-colors"
                    onClick={() => handleDetails(item.idCorrida || "")}
                  >
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
                      <time>{item.horaInicio}</time> -{" "}
                      <time>{item.horaFin}</time>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-900">
                      {/* Aquí iría la hora programada */}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CardsView({ data }: { data: any[] }) {
  let currentCorrida = 0;
  const groupedData = [];

  data.forEach((item, index) => {
    if (item.idCorrida && item.idCorrida !== currentCorrida) {
      groupedData.push({ tipo: "separador", id: `sep-${item.idCorrida}` });
      currentCorrida = item.idCorrida;
    }
    groupedData.push(item);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
      {data.map((item, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border-2 ${
            item.tipo === "cambio-rollos"
              ? "bg-blue-50 border-blue-300 col-span-full"
              : "bg-white border-gray-200"
          }`}
        >
          {item.tipo === "cambio-rollos" ? (
            <div className="text-center">
              <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full">
                <span className="text-blue-600 mr-2">🔄</span>
                <span className="font-semibold text-blue-800">
                  {item.motivo} - {item.materiales}
                </span>
                <span className="ml-4 text-blue-700 text-sm">
                  {item.horaInicio} - {item.horaFin}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-start border-b pb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    {item.medidas?.largo}x{item.medidas?.ancho}
                  </h3>
                  <p className="text-gray-600">{item.simbolo}</p>
                </div>
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {item.maquina}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Cliente</p>
                  <p className="font-medium">{item.cliente}</p>
                </div>
                <div>
                  <p className="text-gray-500">Cantidad</p>
                  <p className="font-medium">{item.cantidad}</p>
                </div>
                <div>
                  <p className="text-gray-500">Rayados</p>
                  <p className="font-medium">{item.rayados}</p>
                </div>
                <div>
                  <p className="text-gray-500">Horario</p>
                  <p className="font-medium">
                    {item.horaInicio} - {item.horaFin}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
