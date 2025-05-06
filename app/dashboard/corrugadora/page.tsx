import Breadcrumbs from "@/app/ui/breadcrumbs";
import CorrugadoraTable from "@/app/ui/dashboard/programacion-corrugadora";

export default function Page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/corrugadora", label: "Corrugadora", active: true },
        ]}
      />
      <CorrugadoraTable />
    </div>
  );
}
