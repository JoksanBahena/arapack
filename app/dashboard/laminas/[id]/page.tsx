import { fetchSheetById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import SheetInfo from "@/app/ui/laminas/sheet-info";

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
      <SheetInfo data={data} id={params.id} />
    </div>
  );
}
