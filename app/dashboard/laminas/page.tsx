import LaminasTable from "@/app/ui/laminas/laminas-table";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      {/* <div className="mt-4 mb-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar cajas..." />
      </div>
      <Suspense fallback={<BoxesTableSkeleton />}>
        <CajasTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
      <LaminasTable />
    </div>
  );
}
