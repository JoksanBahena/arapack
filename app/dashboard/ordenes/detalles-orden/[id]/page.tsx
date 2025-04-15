import { fetchPurchaseById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const params = await props.params;
  const data = await fetchPurchaseById(params.id);
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/ordenes", label: "Órdenes" },
          { label: "Detalles de órden", href: "" },
          {
            label: `${data.arapack_lot}`,
            href: `/dashboard/ordenes/detalles-orden/${data.arapack_lot}`,
            active: true,
          },
        ]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Columna izquierda: Detalles */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Detalles de la orden</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong className="font-medium">Número de orden:</strong>{" "}
              {data.order_number}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Cliente:</strong> {data.client}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Símbolo:</strong> {data.symbol}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Repetición/Nuevo:</strong>{" "}
              {data.repetition_new}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Cantidad:</strong> {data.quantity}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">
                Fecha de entrega estimada:
              </strong>{" "}
              {data.estimated_delivery_date}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Lote de Arapack:</strong>{" "}
              {data.arapack_lot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
