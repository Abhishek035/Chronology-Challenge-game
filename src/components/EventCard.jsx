// components/EventCard.jsx

import React from "react";
import "./EventCard.css";

export default function EventCard({
  event,
  isRevealed,
  correctPosition,
  isCorrect,
  onCheck,
}) {
  const cardClassName = `event-card ${
    isCorrect === true ? "correct" : isCorrect === false ? "incorrect" : ""
  }`;

  return (
    <div className={cardClassName}>
      <div className="event-content">
        {isRevealed && (
          <span className="event-position">{correctPosition}.</span>
        )}
        <span className="event-description">{event.description}</span>
      </div>
      <button onClick={onCheck} className="check-button">
        Check
      </button>
    </div>
  );
}