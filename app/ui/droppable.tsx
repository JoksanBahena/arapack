import React from "react";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

type DroppableProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  style?: React.CSSProperties;
};

export default function Droppable({
  id,
  children,
  className = "",
  activeClassName = "",
  style = {},
}: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const combinedClassName = clsx(
    "border-2 border-dashed rounded-lg flex items-center justify-center transition-colors duration-300",
    className,
    isOver && activeClassName
  );

  return (
    <div ref={setNodeRef} className={combinedClassName} style={style}>
      {children}
    </div>
  );
}
