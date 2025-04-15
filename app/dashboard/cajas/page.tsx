import { fetchBoxesPages } from "@/app/lib/data";
import CajasTable from "@/app/ui/cajas/table";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import { BoxesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { CreateBox } from "@/app/ui/cajas/buttons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchBoxesPages(query);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/cajas", label: "Cajas", active: true },
        ]}
      />
      <div className="mt-4 mb-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar cajas..." />
        <CreateBox />
      </div>
      <Suspense key={query + currentPage} fallback={<BoxesTableSkeleton />}>
        <CajasTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
