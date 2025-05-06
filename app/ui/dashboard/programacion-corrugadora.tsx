import { fetchProgramPlaning } from "@/app/lib/data";
import { Fragment } from "react";

export default async function CorrugadoraTable() {
  let currentCorrida = 0;
  let currentSheet: string | null = null;

  const data = await fetchProgramPlaning(20);

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
              Símbolo
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Salen
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Refil
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cantidad
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Metros lineales
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Velocidad
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Tratamiento
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Fecha programada
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Hora programada
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.production_runs.map((item, idx) => {
            const showSeparator = idx !== 0 && idx !== currentCorrida;
            if (showSeparator) {
              currentCorrida = idx;
            }
            
            const showChangeRolls = item.sheet.id !== currentSheet;
            if (showChangeRolls) {
              currentSheet = item.sheet.id;
            }
            return (
              <Fragment key={idx}>
                <>
                  {showChangeRolls ? (
                    <tr className="bg-blue-300">
                      <td
                        colSpan={10}
                        className="px-4 py-3 text-xs text-gray-900 text-center"
                      >
                        <div className="flex items-center justify-center">
                          <span className="mr-2">🔄</span>
                          Cambio de rollo -
                          <span className="ml-2">
                            ECT: {item.sheet.ect} |{" "}
                            Largo: {item.sheet.roll_width} |{" "}
                            P1: {item.sheet.p1} | P2: {item.sheet.p2} | P3:{" "}
                            {item.sheet.p3}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : showSeparator && (
                    <tr className="h-4 bg-gray-100">
                      <td colSpan={10} className="p-0"></td>
                    </tr>
                  )}
                  {item.processed_boxes.map((box, boxIdx) => (
                    <tr
                      key={boxIdx}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-4 py-3 text-xs text-gray-900 max-w-xs whitespace-normal">
                        {item.machine}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {box.symbol}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {box.output}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {item.refile}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {box.quantity}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {item.linear_meters}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {item.speed}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {item.treatment}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        {item.scheduled_date}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900">
                        <time>{item.start_time}</time> -{" "}
                        <time>{item.end_time}</time>
                      </td>
                    </tr>
                  ))}
                </>
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
