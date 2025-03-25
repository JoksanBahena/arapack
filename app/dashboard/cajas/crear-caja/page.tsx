import Breadcrumbs from "@/app/ui/breadcrumbs";
import BoxForm from "@/app/ui/cajas/create-form";

export default function Page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/cajas", label: "Cajas" },
          {
            href: "/dashboard/cajas/crear-caja",
            label: "Crear caja",
            active: true,
          },
        ]}
      />
      <BoxForm/>
    </div>
  );
}
