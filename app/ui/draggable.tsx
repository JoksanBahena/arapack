import React from "react";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";

type DraggableProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Draggable({
  id,
  children,
  className = "",
  style = {},
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const dragStyle = transform
    ? {
        ...style,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : style;

  const defaultClassName =
    "px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition-transform";

  return (
    <button
      ref={setNodeRef}
      style={dragStyle}
      className={clsx(defaultClassName, className)}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}
