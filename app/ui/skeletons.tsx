// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-4 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-4 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-4 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-4 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-4 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex gap-3">
          <div className="h-[20px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function BoxesTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Símbolo
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cliente
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Medidas
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Liner
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ECT
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Rayados
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </tbody>
      </table>
    </div>
  );
}

export function SheetsTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Asociadas
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Ancho
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              P1
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              P2
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              P3
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ECT
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </tbody>
      </table>
    </div>
  );
}

export function PurchasesTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Fecha de Recepción
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Número de Orden
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cliente
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Símbolo
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Repetición/Nuevo
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cantidad
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Fecha de Entrega Estimada
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Costo Unitario
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </tbody>
      </table>
    </div>
  );
}

export function CorrugadoraSkeletonTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Símbolo",
              "Salen",
              "Cantidad",
              "Refil",
              "Metros lineales",
              "Velocidad",
              "Tratamiento",
              "Fecha programada",
              "Hora programada",
            ].map((header, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {Array.from({ length: 10 }).map((_, idx) => (
            <tr key={idx} className="animate-pulse">
              <td className="px-4 py-3">
                <div className="h-4 w-12 bg-gray-100 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-16 bg-gray-100 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-10 bg-gray-100 rounded"></div>
              </td>
              {/* Columnas con rowspan simuladas una vez */}
              <td className="px-4 py-3">
                <div className="h-4 w-10 bg-gray-100 rounded mx-auto"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-16 bg-gray-100 rounded mx-auto"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-14 bg-gray-100 rounded mx-auto"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-28 bg-gray-100 rounded mx-auto"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 bg-gray-100 rounded mx-auto"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 bg-gray-100 rounded mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SkeletonOrderinfo() {
  const baseClass = "h-4 bg-gray-200 rounded animate-pulse";

  return (
    <div className="space-y-6">
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
      <div className="space-y-4 border-t border-gray-100 pt-6">
        {[...Array(6)].map((_, sectionIndex) => (
          <div
            key={sectionIndex}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
          >
            <div className="h-5 w-32 bg-gray-300 rounded animate-pulse" />
            <div className="space-y-2 col-span-2">
              {[...Array(4)].map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className={`${baseClass} w-full max-w-md`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonBoxInfo() {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información General */}
        <SkeletonCard title="Información General" rows={3} />

        {/* Especificaciones Técnicas */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <SkeletonTitle
            iconColor="text-purple-600"
            label="Especificaciones Técnicas"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-white rounded-md shadow-sm w-8 h-8 animate-pulse" />
                <div>
                  <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-5 w-24 bg-gray-300 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rayados */}
        <SkeletonCard title="Rayados" pills={["R1", "R2", "R3"]} />

        {/* Tintas */}
        <SkeletonCard title="Tintas" rowCount={1} />

        {/* Documento */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 col-span-full">
          <SkeletonTitle iconColor="text-red-600" label="Documento" />
          <div className="aspect-video bg-gray-100 rounded-lg animate-pulse mt-4" />
        </div>
      </div>
    </>
  );
}

function SkeletonCard({
  title,
  rows,
  pills,
  rowCount = 3,
}: {
  title: string;
  rows?: number;
  pills?: string[];
  rowCount?: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <SkeletonTitle label={title} />
      {rows && (
        <div className="space-y-4 mt-4">
          {Array.from({ length: rows }).map((_, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
            >
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse" />
            </div>
          ))}
        </div>
      )}
      {pills && (
        <div className="flex gap-4 mt-4">
          {pills.map((pill) => (
            <div
              key={pill}
              className="text-center p-3 bg-gray-50 rounded-lg flex-1"
            >
              <div className="text-sm text-gray-400">{pill}</div>
              <div className="h-6 w-8 mx-auto mt-2 bg-gray-300 rounded animate-pulse" />
            </div>
          ))}
        </div>
      )}
      {!rows && !pills && (
        <div className="flex flex-wrap gap-2 mt-4">
          {Array.from({ length: rowCount }).map((_, idx) => (
            <div
              key={idx}
              className="px-3 py-1 bg-gray-200 rounded-full w-20 h-6 animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SkeletonTitle({
  iconColor = "text-gray-400",
  label,
}: {
  iconColor?: string;
  label: string;
}) {
  return (
    <div className="text-xl font-semibold mb-4 flex items-center gap-2">
      <div
        className={`w-5 h-5 rounded-full bg-gray-300 animate-pulse ${iconColor}`}
      />
      <div className="w-40 h-6 bg-gray-300 rounded animate-pulse" />
    </div>
  );
}

// app/ui/corrugadora/sheets-list-skeleton.tsx
export function ListSkeleton() {
  return (
    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <ul
        role="list"
        className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="py-4 pr-5 pl-4 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
          </li>
        ))}
      </ul>
    </dd>
  );
}

export function WildcardsSheetsColumnSkeleton() {
  return (
    <>
      <div>
        <h2 className="text-blue-400 font-bold text-xl mb-2">Comodines</h2>
        <ListSkeleton />
      </div>

      <div>
        <h2 className="text-blue-400 font-bold text-xl mb-2">
          Rollos seleccionados
        </h2>
        <ListSkeleton />
      </div>
    </>
  );
}
