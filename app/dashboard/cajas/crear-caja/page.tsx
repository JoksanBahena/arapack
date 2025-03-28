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
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm/6 text-gray-600">
            Llena el formulario para crear una nueva caja.
          </p>
        </div>
        <BoxForm />
      </div>
    </div>
  );
}
