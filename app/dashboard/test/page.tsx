import { fetchFilteredPurchasesByStatus } from "@/app/lib/data";
import {
  OrdenCompraInfo,
  PedidoCard,
  ResumenCorrida,
  RolloDisponibleCard,
} from "@/app/ui/corrugadora/cards";
import ProgramList from "@/app/ui/corrugadora/program-list";
import PurchaseRow from "@/app/ui/corrugadora/purchase-row";
import PurchasesList from "@/app/ui/corrugadora/purchases-list";

export default async function TestPage() {
  const data = await fetchFilteredPurchasesByStatus();
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
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              className="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              {data.map((purchase) => (
                <PurchaseRow purchase={purchase} key={purchase.arapack_lot} />
              ))}
            </ul>
          </dd>
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

          <OrdenCompraInfo
            pedido={{
              nombre: "galletera",
              fecha: "13/06/25",
              medidas: "30x35",
            }}
            rollo={{ ancho: 110, ect: [19, 21], disp: 10000 }}
          />
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
            <h2 className="text-blue-400">Rollos seleccionados</h2>
            <RolloDisponibleCard ancho="110" ect="21" disponibles="2100" />
            <RolloDisponibleCard ancho="110" ect="19" disponibles="10000" />
            <RolloDisponibleCard ancho="75" ect="21" disponibles="1500" />
            <RolloDisponibleCard ancho="115" ect="26" disponibles="7600" />
          </div>
        </div>
      </div>
    </div>
  );
}
