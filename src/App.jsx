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
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(
    Math.floor(Math.random() * eventSets.length)
  );
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [correctOrder, setCorrectOrder] = useState({});
  const [itemStatus, setItemStatus] = useState({});

  useEffect(() => {
    const currentPuzzle = eventSets[currentPuzzleIndex];
    setEvents(shuffleArray([...currentPuzzle.events]));

    const sortedOrder = [...currentPuzzle.events].sort(
      (a, b) => a.year - b.year
    );
    const orderMap = {};
    sortedOrder.forEach((event, index) => {
      orderMap[event.id] = index + 1;
    });

    setCorrectOrder(orderMap);
    setMessage("");
    setIsRevealed(false);
    setItemStatus({});
  }, [currentPuzzleIndex]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setEvents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setItemStatus({});
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

  const checkSingleItem = (itemId) => {
    const userIndex = events.findIndex((item) => item.id === itemId);
    
    // This is the core logic. It compares the current position with the correct one.
    const isCorrect = userIndex + 1 === correctOrder[itemId];

    // We use a functional update to ensure we're working with the latest state.
    setItemStatus((prevStatus) => ({
      ...prevStatus,
      [itemId]: isCorrect,
    }));
  };

  const nextPuzzle = () => {
    setCurrentPuzzleIndex(
      (prevIndex) => (prevIndex + 1) % eventSets.length // Simplified for predictability
    );
  };

  const revealAnswer = () => {
    setIsRevealed(true);
    setMessage("The correct order is revealed. Now try arranging them!");
  };

  // Add this log to see if the App component re-renders with the new state
  console.log("App component rendering. itemStatus:", itemStatus);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chronology Challenge</h1>
        <p>Arrange the historical events in the correct chronological order.</p>
      </header>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Timeline
          items={events}
          isRevealed={isRevealed}
          correctOrder={correctOrder}
          itemStatus={itemStatus}
          checkSingleItem={checkSingleItem}
        />
      </DndContext>
      <div className="controls">
        <button onClick={checkOrder}>Check Answer</button>
        <button
          onClick={revealAnswer}
          disabled={isRevealed || message.includes("Congratulations")}
        >
          Reveal Answer
        </button>
        {message && <p className="message">{message}</p>}
        {message.includes("Congratulations") && (
          <button onClick={nextPuzzle}>Next Puzzle</button>
        )}
      </div>
    </div>
  );
}