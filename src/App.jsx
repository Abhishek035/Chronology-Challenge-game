import React from "react";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Timeline from "./components/Timeline";
import { eventSets } from "./data/events";
import "./App.css";

export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export default function App() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const currentPuzzle = eventSets[currentPuzzleIndex];
    setEvents(shuffleArray([...currentPuzzle.events]));
    setMessage("");
  }, [currentPuzzleIndex]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setEvents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const checkOrder = () => {
    const sortedEvents = [...events].sort((a, b) => a.year - b.year);
    const userOrderIds = events.map((e) => e.id).join(",");
    const correctOrderIds = sortedEvents.map((e) => e.id).join(",");

    if (userOrderIds === correctOrderIds) {
      setMessage("Congratulations! You got it right!");
    } else {
      setMessage("Not quite right. Try again!");
    }
  };

  const nextPuzzle = () => {
    setCurrentPuzzleIndex((prevIndex) => (prevIndex + 1) % eventSets.length);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chronology Challenge</h1>
        <p>Arrange the historical events in the correct chronological order.</p>
      </header>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Timeline items={events} />
      </DndContext>
      <div className="controls">
        <button onClick={checkOrder}>Check Answer</button>
        {message && <p className="message">{message}</p>}
        {message.includes("Congratulations") && (
          <button onClick={nextPuzzle}>Next Puzzle</button>
        )}
      </div>
    </div>
  );
}
