import { fetchSheetById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { EditSheet } from "@/app/ui/laminas/buttons";

export default async function Page(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const params = await props.params;
  const data = await fetchSheetById(params.id);

  if (!data) {
    return <p>No se encontró la caja.</p>;
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/laminas", label: "Láminas" },
          {
            label: `${data.roll_width}cm x ${data.p1}g. x ${data.p2}g. x ${data.p3}g.`,
            href: `/dashboard/laminas/${params.id}`,
            active: true,
          },
        ]}
      />
      <EditSheet id={params.id} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Columna izquierda: Detalles */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Detalles de la caja</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong className="font-medium">Símbolo:</strong> {data.ect}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Cliente:</strong> {data.grams}
            </p>
            {/* <p className="text-gray-700">
              <strong className="font-medium">Liner:</strong> {data.liner}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">ECT:</strong> {data.ect}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Flauta:</strong> {data.flute}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Tratamiento:</strong>{" "}
              {data.treatment === 1 ? "Con tratamiento" : "Sin tratamiento"}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Medidas:</strong> {data.length}cm
              x {data.width}cm
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Rayados:</strong>{" "}
              {data.creases.r1} - {data.creases.r2} - {data.creases.r3}
            </p> */}
          </div>
        </div>

        {/* Columna derecha: PDF */}
        {/* <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Visualización del PDF</h2>

          {data.pdf_link ? (
            <div className="border rounded-lg overflow-hidden">
              <iframe
                src={`http://localhost:8000/pdf/${data.pdf_link}`}
                className="w-full h-[600px]"
                title="PDF Viewer"
              />
            </div>
          ) : (
            <p className="text-gray-500">
              No hay PDF disponible para esta caja.
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
}
