import { Suspense } from "react";
import CajasTable from "../ui/dashboard/cajas-table";
import ExcelUploader from "../ui/dashboard/excel-uploader";
import LaminasTable from "../ui/dashboard/laminas-table";
import Pagination from "../ui/invoices/pagination";
import { InvoicesTableSkeleton } from "../ui/skeletons";
import CancelOrderModal from "../ui/order/cancel-order-modal";
import ChangeDateModal from "../ui/order/change-date-modal";
import CorrugadoraTable from "../ui/dashboard/programacion-corrugadora";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 10;
  return (
    <div>
      {/* <h1 className="mb-2">Cargar Archivo Excel</h1>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <ExcelUploader />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <LaminasTable />
      <CajasTable />
      <CancelOrderModal />
      <ChangeDateModal /> */}
      <CorrugadoraTable />
    </div>
  );
}
