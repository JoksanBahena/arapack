"use client";
import { useState } from "react";
import readXlsxFile from "read-excel-file";
import { excelFormatDate } from "@/app/lib/utils";
import { Button } from "../button";

type CellValue = string | number | boolean | typeof Date | null;
type ExcelRow = CellValue[];

export default function ExcelUploader() {
  const [data, setData] = useState<ExcelRow[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      readXlsxFile(file).then((rows: ExcelRow[]) => {
        setData(rows);
      });
    }
  };

  console.log(data);

  const handleDeleteFile = () => {
    setData([]);
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".xlsx, .xls"
        className="mb-4"
      />
      <Button className="mt-2 mb-5" onClick={handleDeleteFile}>
        Reiniciar
      </Button>
      {data.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {data[1].map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {header?.toString()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.slice(2).map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-3 text-xs text-gray-900"
                    >
                      {cell
                        ? typeof Date
                          ? excelFormatDate(cell)
                          : cell.toString()
                        : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
