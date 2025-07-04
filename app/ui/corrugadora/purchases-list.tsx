"use client";
import { useState } from "react";
import { Purchase } from "@/app/lib/definitions";
import PurchaseRow from "./purchase-row";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function PurchasesList({ purchases }: { purchases: Purchase[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(
    searchParams.get("symbol")
  );

  const handleSelect = useDebouncedCallback((symbol: string, arapack_lot: string) => {
    setSelectedSymbol(prev => (prev === symbol ? null : symbol));

    const params = new URLSearchParams(searchParams);
    if (symbol === searchParams.get("symbol")) {
      params.delete("symbol");
      params.delete("arapack_lot");
    } else {
      params.set("symbol", symbol);
      params.set("arapack_lot", arapack_lot);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <ul
        role="list"
        className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
      >
        {purchases.map(purchase => (
          <PurchaseRow
            key={purchase.symbol}
            purchase={purchase}
            selected={purchase.symbol === selectedSymbol}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </dd>
  );
}
