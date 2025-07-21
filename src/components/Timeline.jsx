import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EventCard from "./EventCard";
import "./Timeline.css";

// This component is the main sortable container.
export function SortableItem({ id, event }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="sortable-item"
    >
      <EventCard event={event} />
    </div>
  );
}

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((event) => (
          <SortableItem key={event.id} id={event.id} event={event} />
        ))}
      </SortableContext>
    </div>
  );
}
