"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const [inputError, setInputError] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      const cleanTerm = term.replace(/[^a-zA-Z0-9 .-]/g, "");
      params.set("query", cleanTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            if (e.target.value.match(/[^a-zA-Z0-9 .-]/g)) {
              setInputError("Solo se permiten letras, números, espacios y guiones.");
            } else {
              setInputError("");
            }
            const filteredValue = e.target.value.replace(/[^a-zA-Z0-9 .-]/g, "");
            e.target.value = filteredValue;
            handleSearch(filteredValue);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
    </>
  );
}
