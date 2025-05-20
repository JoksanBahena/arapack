import { Box } from "@/app/lib/definitions";
import {
  ArrowDownTrayIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  DocumentIcon,
  InformationCircleIcon,
  PaintBrushIcon,
  PencilSquareIcon,
  RectangleGroupIcon,
  ScaleIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { UpdateBox } from "./buttons";

export default function BoxInfo({ data }: { data: Box }) {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{data.client}</h1>
        </div>
        <UpdateBox symbol={data.symbol} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sección de Información General */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5 text-blue-600" />
            Información General
          </h2>
          <div className="space-y-4">
            <InfoItem label="Estado">
              <StatusBadge status={data.status} />
            </InfoItem>
            <InfoItem label="Tipo">{data.type}</InfoItem>
            <InfoItem label="Peso">{data.weight} kg</InfoItem>
          </div>
        </div>

        {/* Sección de Especificaciones Técnicas */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CogIcon className="w-5 h-5 text-purple-600" />
            Especificaciones Técnicas
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <SpecificationItem
              icon={<ScaleIcon className="w-5 h-5" />}
              title="ECT"
              value={data.ect}
            />
            <SpecificationItem
              icon={<RectangleGroupIcon className="w-5 h-5" />}
              title="Medidas"
              value={`${data.length}cm × ${data.width}cm`}
            />
            <SpecificationItem
              icon={<ShieldCheckIcon className="w-5 h-5" />}
              title="Tratamiento"
              value={data.treatment ? "Con tratamiento" : "Sin tratamiento"}
            />
            <SpecificationItem
              icon={<ChartBarIcon className="w-5 h-5" />}
              title="Flauta"
              value={data.flute}
            />
          </div>
        </div>

        {/* Sección de Rayados */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PencilSquareIcon className="w-5 h-5 text-green-600" />
            Rayados
          </h2>
          <div className="flex gap-4">
            <CreaseIndicator value={data.creases.r1} label="R1" />
            <CreaseIndicator value={data.creases.r2} label="R2" />
            <CreaseIndicator value={data.creases.r3} label="R3" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PaintBrushIcon className="w-5 h-5 text-orange-600" />
            Tintas
          </h2>
          {Object.values(data.inks).filter(Boolean).length === 0 ? (
            <p className="text-gray-500">La caja no contiene tintas</p>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {(Object.entries(data.inks) as [string, string | undefined][])
                .filter(([, value]) => typeof value === "string" && value)
                .map(([key, value]) => (
                  <InkPill key={key} color={value as string} />
                ))}
            </div>
          )}
        </div>

        {/* Sección PDF */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 col-span-full">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DocumentIcon className="w-5 h-5 text-red-600" />
            Documento
          </h2>
          {data.pdf_link ? (
            <div className="space-y-4">
              <div className="relative aspect-video bg-gray-50 rounded-lg border flex items-center justify-center">
                <iframe
                  src={`http://localhost:8000/pdf/${data.pdf_link}`}
                  className="w-full h-full rounded-lg"
                  title="PDF Viewer"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No hay PDF disponible</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Componentes auxiliares
const StatusBadge = ({ status }: { status: Box["status"] }) => {
  const statusStyles = {
    APPROVED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    DISABLED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}
    >
      {status === "APPROVED" && <CheckCircleIcon className="w-4 h-4 mr-1" />}
      {status === "PENDING" && <ClockIcon className="w-4 h-4 mr-1" />}
      {status === "DISABLED" && <XCircleIcon className="w-4 h-4 mr-1" />}
      {status === "APPROVED" && "Aprobada"}
      {status === "PENDING" && "Pendiente"}
      {status === "DISABLED" && "Deshabilitada"}
    </span>
  );
};

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

const CreaseIndicator = ({
  value,
  label,
}: {
  value?: number;
  label: string;
}) => (
  <div className="text-center p-3 bg-gray-50 rounded-lg flex-1">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-xl font-bold text-gray-900">{value || "N/A"}</p>
  </div>
);

const InkPill = ({ color }: { color: string }) => (
  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center gap-2">
    {color}
  </div>
);
