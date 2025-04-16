"use client";
import { SheetsTable } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

export default function TableRow({ sheet }: { sheet: SheetsTable }) {
  const router = useRouter();
  return (
    <tr
      onClick={() =>
        router.push(`/dashboard/laminas/detalles-lamina/${sheet._id}`)
      }
      className="hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <td className="px-4 py-3 text-xs text-gray-900 max-w-xs whitespace-normal">
        {sheet.boxes.length > 0 ? sheet.boxes.join(", ") : "No hay cajas asociadas"}
      </td>
      <td className="px-4 py-3 text-xs text-gray-900">{sheet.roll_width} cm</td>
      <td className="px-4 py-3 text-xs text-gray-900">{sheet.p1}</td>
      <td className="px-4 py-3 text-xs text-gray-900">{sheet.p2}</td>
      <td className="px-4 py-3 text-xs text-gray-900">{sheet.p3}</td>
      <td className="px-4 py-3 text-xs text-gray-900">
        {sheet.ect.map((e) => e).join(" - ")}
      </td>
      {/* <td className="px-4 py-3">
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
              </td> */}
    </tr>
  );
}
