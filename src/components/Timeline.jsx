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
export function SortableItem({ id, event, isRevealed, correctOrder }) {
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
      <EventCard event={event} isRevealed={isRevealed} correctPosition={correctOrder[event.id]} />
    </div>
  );
}

export default function Timeline({ items, isRevealed, correctOrder }) {
  return (
    <div className="timeline">
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((event) => (
          <SortableItem key={event.id} id={event.id} event={event} isRevealed={isRevealed} correctOrder={correctOrder} /> 
        ))}
      </SortableContext>
    </div>
  );
}
