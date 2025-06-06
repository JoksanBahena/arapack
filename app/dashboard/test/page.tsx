"use client";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "@/app/ui/droppable";
import Draggable from "@/app/ui/draggable";

const initialCajas = [
  { id: "caja1", name: "Caja 1" },
  { id: "caja2", name: "Caja 2" },
  { id: "caja3", name: "Caja 3" },
];

const initialLaminas = [
  { id: "lamina1", name: "Lámina 1" },
  { id: "lamina2", name: "Lámina 2" },
  { id: "lamina3", name: "Lámina 3" },
];

const initialPedidos = [
  { id: "pedido1", name: "Pedido 1" },
  { id: "pedido2", name: "Pedido 2" },
  { id: "pedido3", name: "Pedido 3" },
];

export default function ProgramacionPantalla() {
  const [isClient, setIsClient] = useState(false);

  const [programacion, setProgramacion] = useState<any[]>([]);
  const [cajas, setCajas] = useState(initialCajas);
  const [laminas, setLaminas] = useState(initialLaminas);
  const [pedidos, setPedidos] = useState(initialPedidos);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const allItems = [...programacion, ...cajas, ...laminas, ...pedidos];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const item = allItems.find((i) => i.id === active.id);
    if (!item) return;

    const sourceContainers = {
      programacion,
      cajas,
      laminas,
      pedidos,
    };

    const setFunctions = {
      programacion: setProgramacion,
      cajas: setCajas,
      laminas: setLaminas,
      pedidos: setPedidos,
    };

    // Buscar y remover el item de su contenedor original
    Object.entries(sourceContainers).forEach(([key, value]) => {
      if (value.find((el) => el.id === item.id)) {
        setFunctions[key as keyof typeof setFunctions](
          value.filter((el) => el.id !== item.id)
        );
      }
    });

    // Agregarlo al nuevo contenedor
    setFunctions[over.id as keyof typeof setFunctions]((prev: any) => [
      ...prev,
      item,
    ]);
  };

  const renderItems = (items: any[]) =>
    items.map((item) => (
      <Draggable
        key={item.id}
        id={item.id}
        className="p-2 rounded border shadow-sm"
      >
        {item.name}
      </Draggable>
    ));

  return (
    <div className="flex h-screen">
      <main className="flex-1 grid grid-cols-3 gap-4 p-6">
        <DndContext onDragEnd={handleDragEnd}>
          {/* Programación */}
          <section className="bg-white p-4 rounded-xl shadow border h-full flex flex-col">
            <h2 className="text-xl font-bold mb-4">Programación</h2>
            <Droppable
              id="programacion"
              className="flex-1 flex flex-col gap-2"
              activeClassName="bg-blue-100"
            >
              {renderItems(programacion)}
            </Droppable>
          </section>

          {/* Láminas y Cajas */}
          <div className="flex flex-col gap-4 h-full">
            <section className="bg-white p-4 rounded-xl shadow border flex-1 flex flex-col">
              <h2 className="text-xl font-bold mb-4">Láminas</h2>
              <Droppable
                id="laminas"
                className="flex-1 flex flex-col gap-2"
                activeClassName="bg-blue-100"
              >
                {renderItems(laminas)}
              </Droppable>
            </section>

            <section className="bg-white p-4 rounded-xl shadow border flex-1 flex flex-col">
              <h2 className="text-xl font-bold mb-4">Cajas</h2>
              <Droppable
                id="cajas"
                className="flex-1 flex flex-col gap-2"
                activeClassName="bg-blue-100"
              >
                {renderItems(cajas)}
              </Droppable>
            </section>
          </div>

          {/* Pedidos */}
          <section className="bg-white p-4 rounded-xl shadow border h-full flex flex-col">
            <h2 className="text-xl font-bold mb-4">Pedidos</h2>
            <Droppable
              id="pedidos"
              className="flex-1 flex flex-col gap-2"
              activeClassName="bg-blue-100"
            >
              {renderItems(pedidos)}
            </Droppable>
          </section>
        </DndContext>
      </main>
    </div>
  );
}
