import { Box } from "@/app/lib/definitions";
import WildcardRow from "./wildcard-row";

export default function WildcardsList({ wildcards }: { wildcards: Box[] }) {
  if (!wildcards) {
    return (
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
        >
          <li className="py-4 px-5 text-sm text-gray-500">
            Seleccione un pedido para ver los comodines disponibles.
          </li>
        </ul>
      </dd>
    );
  }

  if (!wildcards?.length) {
    return (
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
        >
          <li className="py-4 px-5 text-sm text-gray-500">
            No hay comodines disponibles para este pedido.
          </li>
        </ul>
      </dd>
    );
  }

  return (
    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <ul
        role="list"
        className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
      >
        {wildcards.map((wildcard: Box, i: number) => (
          <WildcardRow key={i} wildcard={wildcard} />
        ))}
      </ul>
    </dd>
  );
}
