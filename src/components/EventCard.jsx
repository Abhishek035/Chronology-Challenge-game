import React from "react";
import "./EventCard.css";

export default function EventCard({ event }) {
  return <div className="event-card">{event.description}</div>;
}

