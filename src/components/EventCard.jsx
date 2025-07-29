import React from "react";
import "./EventCard.css";

export default function EventCard({ event, isRevealed, correctPosition }) {
  return (
    <div className="event-card">
      {isRevealed && <span className="event-position">{correctPosition}.</span>}
      <span className="event-description">{event.description}</span>
    </div>
  );
}
