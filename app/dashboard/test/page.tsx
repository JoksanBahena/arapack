import ProgramList from "@/app/ui/corrugadora/program-list";
import PurchasesList from "@/app/ui/corrugadora/purchases-list";

export default function TestPage() {
  return (
    <div className="flex">
      <div className="flex-1 grid grid-cols-3 gap-4">
        <div className="rounded-xl flex flex-col">
          <PurchasesList />
        </div>
        <div className="flex flex-col gap-4 h-full">
          <section className="bg-white p-4 rounded-xl shadow border flex-1 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Láminas</h2>
          </section>

          <section className="bg-white p-4 rounded-xl shadow border flex-1 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Cajas</h2>
          </section>
        </div>
        <ProgramList />
      </div>
    </div>
  );
}
