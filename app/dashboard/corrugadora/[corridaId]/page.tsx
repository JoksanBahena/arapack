import { Button } from "@/app/ui/button";
import {HomeIcon} from "@heroicons/react/24/outline";

export default function Page() {
  const medidas = [
    { tamaño: "114.3cm x 58cm", producto: "CR 6 PZ5" },
    { tamaño: "112.3cm x 42cm", producto: "CR 15 R-R" },
    { tamaño: "2cm", producto: "Detalles de la caja" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Encabezado con navegación */}
      <div className="flex justify-between items-center mb-8">
        <Button>
          ← Anterior
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">ID Corrida: 001</h1>
        <Button>
          Siguiente →
        </Button>
      </div>

      {/* Programa de producción */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold text-blue-800">
            Programa de la corrugadora
          </h2>
        </div>
        <p className="text-gray-700">1:00pm - 2:40pm</p>
      </div>

      {/* Sección Generales */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Generales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem label="ECT" value="21" icon={<HomeIcon /> } />
          <DetailItem label="Velocidad" value="70 - 75" icon={<HomeIcon />} />
          <DetailItem label="Metros lineales" value="10511" icon={<HomeIcon />} />
          <DetailItem label="Tratamiento" value="NA" />
          <DetailItem label="Bobina" value="160cm × 110 × 110 × 125" />
        </div>
      </div>

      {/* Específicos */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Específicos
        </h2>
        <p className="text-gray-700">ER 15 R-R</p>
      </div>

      {/* Entrega estimada */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Entrega estimada
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem label="Fecha" value="28/01/2025" />
          <DetailItem label="Cliente" value="GALLETERA" />
          <DetailItem label="Cantidad" value="1904 / 4000" />
          <DetailItem label="Rayados" value="12.9-16.2-12.9" />
          <DetailItem label="Máquina" value="FLEXO" />
          <DetailItem label="Orden de compra" value="048087" />
        </div>
      </div>

      {/* Medidas */}
      <div className="space-y-4">
        {medidas.map((medida, index) => (
          <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-700 mb-2">
              {index === 0 ? "Medida principal" : `Segunda medida ${index}`}
            </h3>
            <p className="text-gray-600">{medida.tamaño}</p>
            <p className="text-sm text-gray-500">{medida.producto}</p>
            
            {index === medidas.length - 1 && (
              <Button className="mt-2 px-0 text-blue-600">
                Ver detalles de la caja
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-gray-400">{icon}</span>}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}