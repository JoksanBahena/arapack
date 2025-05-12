import { fetchProgramPlaning } from "@/app/lib/data";
import TableRow from "./table-row";
import { ProgramPlaning } from "@/app/lib/definitions";

export default async function CorrugadoraTable({
  week
}: {
  week: number;
}) {
  const data = await fetchProgramPlaning(week);

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
              Salen
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cantidad
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Refil
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
          {data.production_runs.map((item, idx) => (
            <TableRow item={item as ProgramPlaning} idx={idx} key={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
