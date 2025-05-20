"use client";
import { ProgramPlaning } from "@/app/lib/definitions";
import { Fragment, useState, useMemo } from "react";
import CorrugadoraModal from "./modal-details";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { formatDateToLocal } from "@/app/lib/utils";

export default function VerticalProgramView({
  programs,
}: {
  programs: ProgramPlaning[];
}) {
  const [selectedItem, setSelectedItem] = useState<ProgramPlaning | null>(null);

  // Memoizar el procesamiento de programas
  const processedPrograms = useMemo(() => {
    let currentSheet: string | null = null;
    return programs.map((program, index) => {
      const showChangeRolls = program.sheet.id !== currentSheet;
      currentSheet = program.sheet.id;
      return { ...program, showChangeRolls };
    });
  }, [programs]);

  const handleItemClick = (item: ProgramPlaning) => {
    setSelectedItem(item);
  };

  return (
    <div className="space-y-8 relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

      {processedPrograms.map((item, index) => (
        <Fragment key={`${item.sheet.id}-${index}`}>
          {item.showChangeRolls && (
            <div className="relative flex gap-4">
              <div className="relative">
                <div className="w-6 h-6 bg-blue-100 border-2 border-blue-600 rounded-full" />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex-1">
                <div className="flex items-center gap-2 text-blue-800">
                  <ArrowPathIcon className="w-5 h-5" />
                  <h4 className="font-semibold">Cambio de rollo programado</h4>
                </div>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <DetailItem label="ECT" value={item.sheet.ect} />
                  <DetailItem
                    label="Ancho"
                    value={`${item.sheet.roll_width}cm`}
                  />
                  <DetailItem
                    label="P1/P2/P3"
                    value={`${item.sheet.p1} | ${item.sheet.p2} | ${item.sheet.p3}`}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="relative flex gap-4">
            <div className="relative">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">{index + 1}</span>
              </div>
              {index !== processedPrograms.length - 1 && (
                <div className="absolute left-3 top-8 -bottom-8 w-0.5 bg-blue-600" />
              )}
            </div>

            <div
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 cursor-pointer hover:border-blue-200 transition-all"
              onClick={() => handleItemClick(item)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {formatDateToLocal(item.scheduled_date)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <time>{item.start_time}</time> -{" "}
                    <time>{item.end_time}</time>
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {item.speed} m/min
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-3 bg-gray-50 rounded-lg">
                <DetailItem label="Refil" value={`${item.refile}%`} />
                <DetailItem
                  label="Metros lineales"
                  value={new Intl.NumberFormat("es-MX", {
                    style: "decimal",
                    maximumFractionDigits: 0,
                  }).format(item.linear_meters)}
                />
                <DetailItem
                  label="Tratamiento"
                  value={item.treatment ? "✅ Activo" : "❌ Inactivo"}
                  highlight={item.treatment ? true : false}
                />
              </div>

              <div className="space-y-3">
                {item.processed_boxes.map((box) => (
                  <BoxItem key={box.arapack_lot} box={box} />
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      ))}

      <CorrugadoraModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem as ProgramPlaning}
      />
    </div>
  );
}

// Componente memoizado para las cajas
const BoxItem = ({ box }: { box: any }) => (
  <div className="p-3 border rounded-lg hover:bg-gray-50">
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{box.symbol}</p>
        <p className="text-sm text-gray-600">Lote: {box.arapack_lot}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">
          {new Intl.NumberFormat("es-MX", {
            style: "decimal",
            maximumFractionDigits: 0,
          }).format(box.quantity)}{" "}
          <span className="text-xs text-gray-500">pzs.</span>
        </p>
        <p className="text-sm text-gray-600">Salen: {box.output}</p>
      </div>
    </div>
  </div>
);

// Componente memoizado para los detalles
const DetailItem = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) => (
  <div className={`p-2 ${highlight ? "bg-green-100" : "bg-white"} rounded`}>
    <p className="text-xs text-gray-600">{label}</p>
    <p
      className={`font-medium ${
        highlight ? "text-green-800" : "text-gray-900"
      }`}
    >
      {value}
    </p>
  </div>
);
