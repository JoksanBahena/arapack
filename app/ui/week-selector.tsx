"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function getCurrentWeek(): number {
  const date = new Date();
  const firstThursday = new Date(date.getFullYear(), 0, 1);
  const dayOfWeek = firstThursday.getDay();
  const offset = dayOfWeek <= 4 ? 1 - dayOfWeek : 8 - dayOfWeek;
  firstThursday.setDate(firstThursday.getDate() + offset);
  const diff = date.getTime() - firstThursday.getTime();
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
}

export default function WeekSelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);

  useEffect(() => {
    const currentWeek = getCurrentWeek().toString();
    const urlWeek = searchParams.get("week");

    if (!urlWeek) {
      const params = new URLSearchParams(searchParams);
      params.set("week", currentWeek);
      replace(`${pathname}?${params.toString()}`);
      setSelectedWeek(currentWeek);
    } else {
      setSelectedWeek(urlWeek);
    }
  }, [searchParams, pathname, replace]);

  const handleSelectWeek = (week: string) => {
    const params = new URLSearchParams(searchParams);

    if (week) {
      params.set("week", week);
    } else {
      params.delete("week");
    }
    replace(`${pathname}?${params.toString()}`);
    setSelectedWeek(week);
  };

  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="week-select" className="sr-only">
        Selecciona la semana:
      </label>
      <select
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        value={selectedWeek ?? ""}
        onChange={(e) => handleSelectWeek(e.target.value)}
      >
        <option value="">-- Semana --</option>
        {weeks.map((week) => (
          <option key={week} value={week}>
            Semana {week}
          </option>
        ))}
      </select>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
