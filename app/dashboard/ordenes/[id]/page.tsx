import { fetchPurchaseById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import OrderInfo from "@/app/ui/ordenes/order-info";
import { SkeletonOrderinfo } from "@/app/ui/skeletons";
import { Suspense } from "react";

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
          {
            label: `${data.arapack_lot}`,
            href: `/dashboard/ordenes/${data.arapack_lot}`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<SkeletonOrderinfo />}>
        <OrderInfo data={data} />
      </Suspense>
    </div>
  );
}
