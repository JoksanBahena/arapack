import { Sheet } from "@/app/lib/definitions";
import clsx from "clsx";

export default function SheetRow({ sheet }: { sheet: Sheet }) {
  return (
    <li
      role="button"
      className={clsx(
        "py-4 pr-5 pl-4 text-sm/6 cursor-pointer transition-colors select-none"
      )}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex w-full md:w-0 flex-1 items-center">
          <div className="flex flex-col md:flex-row md:min-w-0 flex-1 gap-1 md:gap-2">
            <span className="truncate font-medium text-sm">{sheet.roll_width}cm x {sheet.p1}g x {sheet.p2}g x {sheet.p3}g</span>
          </div>
        </div>
      </div>

      <div className="mt-2 text-gray-600 text-xs">ECT: {sheet.ect.map((e) => e).join(" - ")}</div>
    </li>
  );
}
