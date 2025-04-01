import { fetchPurchasesPages } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Pagination from "@/app/ui/invoices/pagination";
import OrdenesTable from "@/app/ui/ordenes/ordenes-table";
import Search from "@/app/ui/search";
import { PurchasesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPurchasesPages(query);

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/ordenes", label: "Órdenes", active: true },
        ]}
      />
      <div className="mt-4 mb-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar órdenes..." />
        {/* <CreateBox /> */}
      </div>
      <Suspense key={query + currentPage} fallback={<PurchasesTableSkeleton />}>
        <OrdenesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}