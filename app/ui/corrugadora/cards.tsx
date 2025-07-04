export function ResumenCorrida() {
  return (
    <div className="border border-black p-3 rounded-md mt-2">
      <p>Corrida</p>
      <p>
        Salida: <span className="text-blue-300 font-bold">3</span>
      </p>
      <p>Refile: 5cm</p>
      <p>Mts lineales: 450m</p>
    </div>
  );
}

type Pedido = {
  nombre: string;
  fecha: string;
  medidas: string;
};

export function OrdenCompraInfo({
  pedido,
  rollo,
}: {
  pedido: Pedido;
  rollo: { ancho: number; ect: number[]; disp: number };
}) {
  return (
    <div className="border border-black p-3 rounded-md text-sm">
      <h3 className="text-red-400 font-bold">Orden de compra</h3>
      <div className="flex items-center gap-2">
        <span className="text-blue-400">cantidad a procesar</span>
        <input
          className="rounded px-2 w-auto"
          type="text"
          defaultValue="4500 / 5000"
        />
        <label>
          <input type="checkbox" /> procesar todo
        </label>
      </div>
      <p className="text-green-400">Símbolo: {pedido.nombre}</p>
      <p className="text-yellow-500">Entrega: {pedido.fecha}</p>
      <p>Liner: Kraft &nbsp; medidas: {pedido.medidas}</p>
    </div>
  );
}

export function RolloDisponibleCard({
  ancho,
  ect,
  disponibles,
}: {
  ancho: string;
  ect: string;
  disponibles: string;
}) {
  return (
    <div className="flex justify-between p-2 rounded-md my-1 border border-black">
      <span className="text-green-400">{ancho}cm</span>
      <span className="text-red-400">{ect}</span>
      <span className="text-orange-400">{disponibles}</span>
    </div>
  );
}

export function PedidoCard({
  nombre,
  cantidad,
  fecha,
  seleccionado = false,
}: {
  nombre: string;
  cantidad: string;
  fecha: string;
  seleccionado?: boolean;
}) {
  return (
    <div
      className={`p-2 rounded-md my-1 ${
        seleccionado ? "bg-red-800 text-white" : "border border-black"
      }`}
    >
      <h3 className="text-lg font-semibold">{nombre}</h3>
      <p>{cantidad} piezas</p>
      <p className="text-yellow-500">{fecha}</p>
    </div>
  );
}
