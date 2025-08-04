// components/Timeline.jsx

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
export function SortableItem({
  id,
  event,
  isRevealed,
  correctOrder,
  itemStatus,
  checkSingleItem,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-item">
      <div className="drag-handle" {...attributes} {...listeners}>
        ⠿
      </div>
      <EventCard
        event={event}
        isRevealed={isRevealed}
        correctPosition={correctOrder[event.id]}
        isCorrect={itemStatus[event.id]}
        onCheck={() => checkSingleItem(event.id)}
      />
    </div>
  );
}

// The rest of the Timeline component remains the same
export default function Timeline({
  items,
  isRevealed,
  correctOrder,
  itemStatus,
  checkSingleItem,
}) {
  return (
    <div className="timeline">
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((event) => (
          <SortableItem
            key={event.id}
            id={event.id}
            event={event}
            isRevealed={isRevealed}
            correctOrder={correctOrder}
            itemStatus={itemStatus}
            checkSingleItem={checkSingleItem}
          />
        ))}
      </SortableContext>
    </div>
  );
}