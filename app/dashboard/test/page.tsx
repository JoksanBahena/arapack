import { Suspense } from "react";
import { fetchFilteredPurchasesByStatus } from "@/app/lib/data";
import PurchasesList from "@/app/ui/corrugadora/purchases-list";
import SheetsList from "@/app/ui/corrugadora/sheets-list";
import { SheetsListSkeleton } from "@/app/ui/skeletons";
import { ResumenCorrida } from "@/app/ui/corrugadora/cards";
import PurchaseCardInfo from "@/app/ui/corrugadora/purchase-card-info";

export default async function TestPage(props: {
  searchParams?: Promise<{
    symbol?: string | null;
    arapack_lot?: string | null;
  }>;
}) {
  const symbol = await props.searchParams?.then(
    (params) => params?.symbol ?? null
  );
  const arapack_lot = await props.searchParams?.then(
    (params) => params?.arapack_lot ?? null
  );
  const purchases = await fetchFilteredPurchasesByStatus();
  const selectedPurchase = purchases.find(
    (purchase) => purchase.symbol === symbol && purchase.arapack_lot === arapack_lot
  );
  // return (
  //   <div className="flex">
  //     <div className="flex-1 grid grid-cols-3 gap-4">
  //       <div className="rounded-xl flex flex-col">
  //         <PurchasesList />
  //       </div>
  //       <div className="flex flex-col gap-4 h-full">
  //         <section className="bg-white p-4 rounded-xl shadow border flex-1 flex flex-col">
  //           <h2 className="text-xl font-bold mb-4">Láminas</h2>
  //         </section>

  //         <section className="bg-white p-4 rounded-xl shadow border flex-1 flex flex-col">
  //           <h2 className="text-xl font-bold mb-4">Cajas</h2>
  //         </section>
  //       </div>
  //       <ProgramList />
  //     </div>
  //   </div>
  // );
  return (
    <div>
      <div className="flex gap-4">
        {/* Pedidos */}
        <div className="w-1/5">
          <h2 className="text-blue-400 font-bold text-xl mb-2">Pedidos</h2>
          <PurchasesList purchases={purchases} />
        </div>

        {/* Panel central */}
        <div className="w-3/5 flex flex-col gap-4">
          {/* Rollo actual seleccionado */}
          <div className="bg-gray-300 p-2 rounded text-white flex justify-between">
            <span className="text-green-600">110cm</span>
            <span className="text-pink-600">21</span>
          </div>

          {/* Slots de rollos en la corrida */}
          <div className="grid grid-cols-1 gap-2">
            {/* Vacíos por ahora */}
            <div className="border border-gray-600 h-12 rounded"></div>
            <div className="border border-gray-600 h-12 rounded"></div>
            <div className="border border-gray-600 h-12 rounded"></div>
            <div className="border border-gray-600 h-12 rounded"></div>
          </div>

          {selectedPurchase && <PurchaseCardInfo purchase={selectedPurchase} />}
          <ResumenCorrida />
        </div>

        {/* Rollos y comodines */}
        <div className="w-1/5 flex flex-col gap-4">
          <div>
            <h2 className="text-blue-400">comodines</h2>
            <div className="text-orange-400 border border-black p-2 rounded-md">
              degasa09 30x35 <span className="text-red-400">19</span>
            </div>
            <div className="text-orange-400 border border-black p-2 rounded-md">
              gerbera 25x42 <span className="text-red-400">21</span>
            </div>
          </div>

          <div>
            <h2 className="text-blue-400 font-bold text-xl mb-2">
              Rollos seleccionados
            </h2>
            <Suspense
              key={symbol ?? "no-symbol"}
              fallback={<SheetsListSkeleton />}
            >
              <SheetsList symbol={symbol ?? ""} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
