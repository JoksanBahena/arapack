import { fetchBoxBySymbol } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import BoxInfo from "@/app/ui/cajas/box-info";
import { SkeletonBoxInfo } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page(props: {
  params: Promise<{
    symbol: string;
  }>;
}) {
  const params = await props.params;
  const data = await fetchBoxBySymbol(params.symbol);

  if (!data) {
    return <p>No se encontró la caja.</p>;
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/cajas", label: "Cajas" },
          {
            label: `${data.symbol}`,
            href: `/dashboard/cajas/${data.symbol}`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<SkeletonBoxInfo />}>
        <BoxInfo data={data} />
      </Suspense>
    </div>
  );
}
