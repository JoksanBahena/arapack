import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { User } from "./program-list";
import { useId } from "react";

export function SortableProgram({ user }: { user: User }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: user.id });

  // Genera un ID estable para SSR
  const uniqueId = useId();

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      aria-describedby={`${uniqueId}-describedby`}
      className="flex items-center border-b border-gray-200 py-2 px-4 touch-action-none"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
        {user.initials}
      </div>
      <div className="ml-4 text-gray-700">{user.name}</div>
    </li>
  );
}