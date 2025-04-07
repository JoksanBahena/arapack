import Breadcrumbs from "@/app/ui/breadcrumbs";
import PurchaseStepperForm from "@/app/ui/ordenes/create-form";

export default function Page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/ordenes", label: "Órdenes" },
          {
            href: "/dashboard/ordenes/crear-orden",
            label: "Registrar orden",
            active: true,
          },
        ]}
      />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm/6 text-gray-600">
            Llena el formulario para registrar una nueva orden. Asegúrate de
            ingresar todos los datos correctamente.
          </p>
        </div>
        <PurchaseStepperForm />
      </div>
    </div>
  );
}
