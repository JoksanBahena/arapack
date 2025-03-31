import { fetchBoxesSymbols } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import SheetForm from "@/app/ui/laminas/create-form";

export default async function Page() {
  const boxes = await fetchBoxesSymbols();

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/laminas", label: "Láminas" },
          {
            href: "/dashboard/laminas/crear-lamina",
            label: "Registrar lámina",
            active: true,
          },
        ]}
      />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm/6 text-gray-600">
            Llena el formulario para registrar una nueva lámina. Asegúrate de
            ingresar todos los datos correctamente.
          </p>
        </div>
        <SheetForm boxes={boxes} />
      </div>
    </div>
  );
}
