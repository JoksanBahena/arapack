"use client";
import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "@/app/ui/droppable";
import Draggable from "@/app/ui/draggable";

const sheets = [
  "Box 1",
  "Box 2",
  "Box 3",
  "Box 4",
  "Box 5",
  "Box 6",
  "Box 7",
  "Box 8",
];

const ect = ["ECT 1", "ECT 2", "ECT 3"];

export default function App() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  if (!isClient) return null;

  return (
    <>
      <div className="p-8 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Drag and Drop Demo</h1>
        <DndContext onDragEnd={handleDragEnd}>
          {parent === null ? draggableMarkup : null}
          <div className="grid grid-cols-3 gap-6 mt-6">
            {containers.map((id) => (
              <Droppable key={id} id={id}>
                {parent === id ? draggableMarkup : "Drop here"}
              </Droppable>
            ))}
          </div>
        </DndContext>
      </div>
      <div className="mb-6">
        <label className="block text-primary mb-1 font-medium">
          Seleccionar láminas
        </label>

        <div className="border rounded-md overflow-hidden">
          <div className="max-h-64 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
            {sheets.map((box, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
              >
                <input
                  type="checkbox"
                  value={box}
                  className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                  {box}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-primary mb-1 font-medium">Comodines</label>

        <div className="border rounded-md focus-within:ring-1 focus-within:border-primary">
          <input
            type="number"
            placeholder="Escribe y presiona Enter..."
            className="w-full px-3 py-2 border-0 focus:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const value = (e.target as HTMLInputElement).value.trim();
                if (value) {
                  ect.push(value);
                  (e.target as HTMLInputElement).value = "";
                }
              }
            }}
          />

          <div className="p-2 border-t">
            <div className="flex flex-wrap gap-2">
              {ect.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 px-2 py-1 rounded-md"
                >
                  <span className="text-sm mr-2">{tag}</span>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => {
                      const newTags = ect.filter((_, i) => i !== index);
                      ect.pop();
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function handleDragEnd(event: any) {
    const { over } = event;
    setParent(over ? over.id : null);
  }
}
