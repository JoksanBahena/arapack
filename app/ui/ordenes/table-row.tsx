"use client";
import { PurchasesTable } from "@/app/lib/definitions";
import { formatDateToLocal, formatNumberWithCommas } from "@/app/lib/utils";
import { useRouter } from "next/navigation";

export default function TableRow({ purchase }: { purchase: PurchasesTable }) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/dashboard/ordenes/${purchase.arapack_lot}`)}
      className="hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <td className="px-4 py-3 text-xs text-gray-900 max-w-xs whitespace-normal">
        {formatDateToLocal(purchase.receipt_date)}
      </td>
      <td className="px-4 py-3 text-xs text-gray-900">
        {purchase.order_number}
      </td>
      <td className="px-4 py-3 text-xs text-gray-900">{purchase.client}</td>
      <td className="px-4 py-3 text-xs text-gray-900">{purchase.symbol}</td>
      <td className="px-4 py-3 text-xs text-gray-900">
        {purchase.repetition_new}
      </td>
      <td className="px-4 py-3 text-xs text-gray-900">
        {formatNumberWithCommas(purchase.quantity)}{" "}
        <span className="text-xs text-gray-500">pzas.</span>
      </td>
      <td className="px-4 py-3 text-xs text-gray-900">
        {formatDateToLocal(purchase.estimated_delivery_date)}
      </td>
      <td className="px-4 py-3 text-xs text-gray-900">
        {purchase.arapack_lot}
      </td>
      <td className="px-4 py-3 text-xs text-gray-900">
        ${formatNumberWithCommas(purchase.subtotal)}{" "}
        <span className="text-xs text-gray-500">MXN</span>
      </td>
    </tr>
  );
}
