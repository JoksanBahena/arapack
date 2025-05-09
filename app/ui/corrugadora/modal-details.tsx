import { ProgramPlaning } from "@/app/lib/definitions";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function CorrugadoraModal({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean;
  onClose: () => void;
  item: ProgramPlaning;
}) {
  if (!item) return null;

  const boxes = item.processed_boxes.map((box) => ({
    symbol: box.symbol,
    quantity: box.quantity,
    output: box.output,
    arapack_lot: box.arapack_lot,
  }));

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
        <div className="fixed left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Detalle de producción</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>

          {/* Programa */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-1">
              Programa de la corrugadora
            </h3>
            <p className="text-gray-700">
              {item.start_time} - {item.end_time}
            </p>
          </div>

          {/* Generales */}
          <div className="border rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold mb-3">Generales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem
                label="ECT"
                value={item.sheet.ect.toString()}
                icon={<HomeIcon />}
              />
              <DetailItem
                label="Velocidad"
                value={item.speed.toString()}
                icon={<HomeIcon />}
              />
              <DetailItem
                label="Metros lineales"
                value={item.linear_meters.toString()}
                icon={<HomeIcon />}
              />
              <DetailItem
                label="Tratamiento"
                value={item.treatment ? "TRATAMIENTO ANTIHUMEDAD" : "N/A"}
              />
              <DetailItem
                label="Bobina"
                value={`${item.sheet.roll_width}cm | ${item.sheet.p1}g. × ${item.sheet.p2}g. × ${item.sheet.p3}g.`} 
              />
            </div>
          </div>

          <div className="space-y-4">
            {boxes.map((box, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <h4 className="font-medium text-gray-700 mb-1">
                  Simbolo: {box.symbol}
                </h4>
                <p className="text-sm text-gray-500">{box.quantity} pzs.</p>
                <p className="text-sm text-gray-500">Salen: {box.output}</p>
                <p className="text-sm text-gray-500">
                  Lote Arapack: {box.arapack_lot}
                </p>
              </div>  
            ))}
          </div>
        </div>
      </div>
    )
  );
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-gray-400">{icon}</span>}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
