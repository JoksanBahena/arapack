import { fetchBoxesSymbols, fetchSheetById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditBoxForm from "@/app/ui/cajas/edit-form";
import EditSheetForm from "@/app/ui/laminas/edit-form";

export default async function Page(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const params = await props.params;
  const data = await fetchSheetById(params.id);
  const boxes = await fetchBoxesSymbols();

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/laminas", label: "Láminas" },
          {
            href: `/dashboard/laminas/${params.id}`,
            label: `${data.roll_width}cm x ${data.p1}g. x ${data.p2}g. x ${data.p3}g.`,
          },
          {
            href: `/dashboard/laminas/${params.id}/editar-lamina`,
            label: "Editar información de la lámina",
            active: true,
          },
        ]}
      />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm/6 text-gray-600">
            Edita la información de la lámina. Asegúrate de que los datos sean correctos y estén actualizados.
          </p>
        </div>
        <EditSheetForm sheet={data} _id={params.id} boxes={boxes} />
      </div>
    </div>
  );
}
