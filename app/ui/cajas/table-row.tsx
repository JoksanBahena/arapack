"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { BoxesTable } from "@/app/lib/definitions";

export default function TableRow({ box }: { box: BoxesTable }) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/dashboard/cajas/detalles-caja/${box.symbol}`)}
      className="hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <td className="px-4 py-3 text-xs text-gray-900 max-w-xs whitespace-normal">
        {box.symbol}
      </td>
      <td className="px-4 py-3 text-xs text-gray-900">{box.client}</td>
      <td className="px-4 py-3 text-xs text-gray-900">
        {box.length}cm x {box.width}cm
      </td>
      <td className="px-4 py-3 text-xs text-gray-900">{box.liner}</td>
      <td className="px-4 py-3 text-xs text-gray-900">{box.ect}</td>
      <td className="px-4 py-3 text-xs text-gray-900">
        {box.creases.r1} - {box.creases.r2} - {box.creases.r3}
      </td>
      <td className="px-4 py-3">
        <span
          className={clsx(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
            {
              "bg-green-100 text-green-800": box.status === "approved",
              "bg-red-100 text-red-800": box.status === "pending",
            }
          )}
        >
          {box.status}
        </span>
      </td>
    </tr>
  );
}
