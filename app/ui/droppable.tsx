import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props: { id: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors duration-300
        ${isOver ? "border-green-500 bg-green-100" : "border-gray-400 bg-gray-50"}`}
    >
      <span className="text-sm font-medium text-gray-700">{props.children}</span>
    </div>
  );
}
