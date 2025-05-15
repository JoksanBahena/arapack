"use client";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { BoxesTable } from "@/app/lib/definitions";

export default function TableRow({ box }: { box: BoxesTable }) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/dashboard/cajas/${box.symbol}`)}
      className="hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <td
        className={clsx({
          "bg-green-200": box.status === "APPROVED",
          "bg-amber-200": box.status === "PENDING",
          "bg-red-200": box.status === "DISABLED",
        })}
      ></td>
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
    </tr>
  );
}
