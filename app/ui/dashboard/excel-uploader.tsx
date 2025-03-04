"use client";
import { useState } from "react";
import readXlsxFile from "read-excel-file";
import { lusitana } from "../fonts";
import { excelFormatDate } from "@/app/lib/utils";
import { Button } from "../button";

type CellValue = string | number | boolean | typeof Date | null;
type ExcelRow = CellValue[];

const ExcelUploader: React.FC = () => {
  const [data, setData] = useState<ExcelRow[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      readXlsxFile(file).then((rows: ExcelRow[]) => {
        // Filtrar las columnas que necesitas
        const filteredData = rows.map((row) => [
          excelFormatDate(row[0]), // Fecha de Recepción
          row[1], // O.C.
          row[2], // Cliente
          row[3], // Símbolo
          row[10], // Cantidad
          excelFormatDate(row[11]), // Fecha de Entrega
          // Agrega más columnas según sea necesario
        ]);
        setData(filteredData);
      });
    }
  };

  const handleDeleteFile = () => {
    setData([]);
  };

  return (
    <>
      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" className="mb-4" />
      <Button className="mt-2 mb-5" onClick={handleDeleteFile}>
        Reiniciar
      </Button>
      {data.length > 0 && (
        <div className="w-full">
          <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
            Pedidos
          </h1>
          <div className="mt-6 flow-root">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                  <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                    <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                      <tr>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Fecha de Recepción
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          O.C.
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Cliente
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Símbolo
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Cantidad
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Fecha de Entrega
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-900">
                      {data.slice(2).map((row, rowIndex) => (
                        <tr key={rowIndex} className="group">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6"
                            >
                              {cell?.toString()}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExcelUploader;
