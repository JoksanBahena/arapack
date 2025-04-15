import { fetchBoxBySymbol } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import EditBoxForm from "@/app/ui/cajas/edit-form";

export default async function Page(props: {
  params: Promise<{
    symbol: string;
  }>;
}) {
  const params = await props.params;
  const data = await fetchBoxBySymbol(params.symbol);
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/cajas", label: "Cajas" },
          {
            href: `/dashboard/cajas/${data.symbol}`,
            label: `${data.symbol}`,
          },
          {
            href: `/dashboard/cajas/${data.symbol}/editar-caja`,
            label: "Editar información de la caja",
            active: true,
          },
        ]}
      />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm/6 text-gray-600">
            Edita la información de la caja. Asegúrate de que los datos sean correctos y estén actualizados.
          </p>
        </div>
        <EditBoxForm box={data} _id={data._id}/>
      </div>
    </div>
  );
}
