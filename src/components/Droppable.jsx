import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./Droppable.css";

export default function Droppable({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    backgroundColor: isOver ? "#c8e6c9" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="droppable">
      {children}
    </div>
  );
}
