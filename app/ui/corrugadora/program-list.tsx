"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableProgram } from "./sortable-program";
import { useSearchParams } from "next/navigation";
import { Button } from "../button";
import ProgramRow from "./program-row";

// data/users.ts
export interface User {
  id: number;
  name: string;
  initials: string;
}

interface Program {
  id: number;
  arapack_lot: string;
  symbol: string;
}

export const users: User[] = [
  { id: 1, name: "Alice Johnson", initials: "AJ" },
  { id: 2, name: "Bob Smith", initials: "BS" },
  { id: 3, name: "Charlie Brown", initials: "CB" },
  { id: 4, name: "David Wilson", initials: "DW" },
  { id: 5, name: "Eva Davis", initials: "ED" },
  { id: 6, name: "Frank Miller", initials: "FM" },
  { id: 7, name: "Grace Lee", initials: "GL" },
  { id: 8, name: "Hannah White", initials: "HW" },
  { id: 9, name: "Ian Green", initials: "IG" },
  { id: 10, name: "Joksan Bahena", initials: "JB" },
];

export default function ProgramList() {
  const searchParams = useSearchParams();
  const [programList, setProgramList] = useState<Program[]>([]);

  // function onDragEnd(event: DragEndEvent) {
  //   const { active, over } = event;

  //   if (active.id === over?.id) {
  //     return;
  //   }

  //   setProgramList((users) => {
  //     const activeIndex = users.findIndex((item) => item.id === active.id);
  //     const overIndex = users.findIndex((item) => item.id === over?.id);

  //     return arrayMove(users, activeIndex, overIndex);
  //   });
  // }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <ul
        role="list"
        className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
      >
        {programList.length > 0 ? (
          programList.map((program, index) => (
            <ProgramRow purchase={program} key={index} />
          ))
        ) : (
          <li className="py-4 px-5 text-sm text-gray-500">
            No hay programas agregados.
          </li>
        )}
      </ul>
      <Button
        className="mt-4"
        onClick={() => {
          const newProgram = {
            id: programList.length + 1,
            arapack_lot: searchParams.get("arapack_lot") || "Lote Desconocido",
            symbol: searchParams.get("symbol") || "Símbolo Desconocido",
          };
          console.log("Adding new program:", newProgram);

          setProgramList((prev) => [...prev, newProgram]);
        }}
      >
        Agregar al programa
      </Button>
    </dd>
  );
}

{
  /* <h2 className="text-2xl font-bold mb-4">Programación</h2>
      <ul className="bg-white shadow-md rounded-lg">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={programList}
            strategy={verticalListSortingStrategy}
          >
            {programList.length > 0 ? (
              programList.map((user: User) => (
                <SortableProgram key={user.id} user={user} />
              ))
            ) : (
              <li className="p-4 text-gray-500">No users found</li>
            )}
          </SortableContext>
        </DndContext>
      </ul> */
}
