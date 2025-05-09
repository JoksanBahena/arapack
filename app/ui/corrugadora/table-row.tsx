"use client";

import { ProgramPlaning } from "@/app/lib/definitions";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import CorrugadoraModal from "./modal-details";

export default function TableRow({
  item,
  idx,
}: {
  item: ProgramPlaning;
  idx: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
  let currentCorrida = 0;
  let currentSheet: string | null = null;

  const router = useRouter();

  const handleClick = () => {
    setIsOpen(true);
  };

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
      <CorrugadoraModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={item}
      />
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
                ECT: {item.sheet.ect} | Largo: {item.sheet.roll_width} | P1:{" "}
                {item.sheet.p1} | P2: {item.sheet.p2} | P3: {item.sheet.p3}
              </span>
            </div>
          </td>
        </tr>
      ) : (
        showSeparator && (
          <tr className="h-4 bg-gray-100">
            <td colSpan={10} className="p-0"></td>
          </tr>
        )
      )}
      {item.processed_boxes.map((box, boxIdx) => (
        <tr
          key={boxIdx}
          className="hover:bg-gray-100 transition-colors"
          onClick={handleClick}
        >
          <td className="px-4 py-3 text-xs text-gray-900">{box.symbol}</td>
          <td className="px-4 py-3 text-xs text-gray-900">{box.output}</td>
          <td className="px-4 py-3 text-xs text-gray-900">{box.quantity}</td>

          {boxIdx === 0 && (
            <>
              <td
                rowSpan={item.processed_boxes.length}
                className="px-4 py-3 text-xs text-gray-900"
              >
                {item.refile}
              </td>
              <td
                rowSpan={item.processed_boxes.length}
                className="px-4 py-3 text-xs text-gray-900"
              >
                {item.linear_meters}
              </td>
              <td
                rowSpan={item.processed_boxes.length}
                className="px-4 py-3 text-xs text-gray-900"
              >
                {item.speed}
              </td>
              <td
                rowSpan={item.processed_boxes.length}
                className={clsx(
                  "px-4 py-3 text-xs text-gray-900",
                  item.treatment && "bg-green-100 text-green-800"
                )}
              >
                {item.treatment ? "TRATAMIENTO ANTIHUMEDAD" : "N/A"}
              </td>
              <td
                rowSpan={item.processed_boxes.length}
                className="px-4 py-3 text-xs text-gray-900"
              >
                {item.scheduled_date}
              </td>
              <td
                rowSpan={item.processed_boxes.length}
                className="px-4 py-3 text-xs text-gray-900"
              >
                <time>{item.start_time}</time> - <time>{item.end_time}</time>
              </td>
            </>
          )}
        </tr>
      ))}
    </Fragment>
  );
}
