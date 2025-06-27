import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

export function CreatePurchase() {
  return (
    <Link
      href="/dashboard/ordenes/crear-orden"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear Orden</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ChangeStatusPurchase({
  handleAction,
  status,
}: {
  handleAction: (action: string) => void;
  status: string;
}) {
  return (
    <button
      type="button"
      className={
        clsx(
          "mt-2 mb-2 mr-2 text-blue-700 underline bg-transparent border-none shadow-none px-0 py-0 text-sm font-medium hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600",
          status === "ABIERTO" && "text-green-700",
          status === "PARCIAL" && "text-yellow-700",
          status === "CANCELADO" && "text-red-700",
          status === "ABIERTO" && "hover:text-green-800",
          status === "PARCIAL" && "hover:text-yellow-800",
          status === "CANCELADO" && "hover:text-red-800"
        ) + " text-sm font-medium"
      }
      onClick={() => {
        handleAction(status);
      }}
    >
      Marcar como {status === "ABIERTO" && "Abierto"}
      {status === "PARCIAL" && "Parcial"}
      {status === "CANCELADO" && "Cancelado"}
    </button>
  );
}
