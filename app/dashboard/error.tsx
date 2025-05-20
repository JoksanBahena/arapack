"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Algo salió mal</h2>
      <p className="mt-2 text-sm text-gray-500">
        <strong>Error: </strong>
        {error.message || "No se pudo completar la operación."}
      </p>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reload()}
      >
        Volver a intentar
      </button>
    </main>
  );
}
