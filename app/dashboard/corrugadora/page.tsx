import Breadcrumbs from "@/app/ui/breadcrumbs";
import CorrugadoraTable from "@/app/ui/corrugadora/table";
import { CorrugadoraSkeletonTable } from "@/app/ui/skeletons";
import WeekSelector from "@/app/ui/week-selector";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    week?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const week = Number(searchParams?.week) || 1;
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            href: "/dashboard/corrugadora",
            label: "Corrugadora",
            active: true,
          },
        ]}
      />
      <div className="mt-4 mb-4 flex items-center justify-between gap-2 md:mt-8">
        <WeekSelector />
      </div>
      <Suspense key={week} fallback={<CorrugadoraSkeletonTable />}>
        <CorrugadoraTable week={week} />
      </Suspense>
    </div>
  );
}
