import { Sheet } from "@/app/lib/definitions";
import { UpdateSheet } from "./buttons";
import {
  ChartBarIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  LinkIcon,
  RectangleGroupIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

export default function SheetInfo({ data, id }: { data: Sheet; id: string }) {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div></div>
        <UpdateSheet id={id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información General */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5 text-blue-600" />
            Información General
          </h2>
          <div className="space-y-4">
            <InfoItem label="Estado">
              <StatusBadge status={data.status} />
            </InfoItem>
            <InfoItem label="Gramaje">{data.grams} gr/m²</InfoItem>
            <InfoItem label="Velocidad">{data.speed} unid/hora</InfoItem>
            <InfoItem label="Descripción">{data.description}</InfoItem>
          </div>
        </div>

        {/* Dimensiones */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <RectangleGroupIcon className="w-5 h-5 text-purple-600" />
            Dimensiones
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <SpecificationItem
              icon={<ScaleIcon className="w-5 h-5" />}
              title="Ancho de Rollo"
              value={`${data.roll_width} cm`}
            />
            <SpecificationItem
              icon={<ChartBarIcon className="w-5 h-5" />}
              title="P1"
              value={data.p1}
            />
            <SpecificationItem
              icon={<ChartBarIcon className="w-5 h-5" />}
              title="P2"
              value={data.p2}
            />
            <SpecificationItem
              icon={<ChartBarIcon className="w-5 h-5" />}
              title="P3"
              value={data.p3}
            />
          </div>
        </div>

        {/* ECT */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-green-600" />
            ECT
          </h2>
          <div className="flex gap-2 flex-wrap">
            {data.ect.map((item, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Cajas Relacionadas */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-orange-600" />
            Cajas Asociadas
          </h2>
          <div className="space-y-2">
            {data.boxes?.map((box, index) => (
              <a
                key={index}
                href={`/dashboard/cajas/${box}`}
                className="text-blue-600 hover:text-blue-800 block hover:underline"
              >
                {box}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Componentes auxiliares reutilizables
const StatusBadge = ({ status }: { status: boolean }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }`}
  >
    {status ? (
      <CheckCircleIcon className="w-4 h-4 mr-1" />
    ) : (
      <CheckCircleIcon className="w-4 h-4 mr-1" />
    )}
    {status ? "Activa" : "Inactiva"}
  </span>
);

const InfoItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-gray-900">{children}</span>
  </div>
);

const SpecificationItem = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="p-2 bg-white rounded-md shadow-sm">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);
