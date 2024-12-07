import { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

function Marble() {
  const secretWord = "SWAN".split(''); // Secret word
  const initialPlacedLetters = ["", "W", "", ""]; // Initial blanks (including hint)
  const initialRemainingLetters = ["S", "A", "N"]; // Initial pool of letters
  const hintIndices = [1]; // Index of hint letters (e.g., the W)

  const [placedLetters, setPlacedLetters] = useState(initialPlacedLetters);
  const [remainingLetters, setRemainingLetters] = useState(initialRemainingLetters);
  const [isSolved, setIsSolved] = useState(false); // Track if the puzzle is solved

  useEffect(() => {
    // Check if the puzzle is solved immediately whenever placed letters change
    setIsSolved(placedLetters.join('') === secretWord.join(''));
  }, [placedLetters]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const letter = active.id; // Dragged letter

    if (isSolved) return; // Disable interaction if solved

    if (over) {
      const overId = over.id;

      if (overId.startsWith("slot-")) {
        // Dropped in a blank slot
        const index = parseInt(overId.replace("slot-", ""));

        // Skip if trying to place in a hint slot
        if (hintIndices.includes(index)) return;

        setPlacedLetters((prev) => {
          const updated = [...prev];

          // Remove the letter from any previous slot
          const prevIndex = prev.indexOf(letter);
          if (prevIndex !== -1) updated[prevIndex] = ""; // Clear the previous slot

          // Return the letter to the pool if replacing a filled slot
          if (updated[index]) {
            setRemainingLetters((prevRemaining) => [...prevRemaining, updated[index]]);
          }

          // Place the letter in the new slot
          updated[index] = letter;
          return updated;
        });

        // Remove the letter from the pool
        setRemainingLetters((prev) => prev.filter((l) => l !== letter));
      } else if (overId === "pool") {
        // Dropped back into the pool
        setRemainingLetters((prev) => [...prev, letter]);

        setPlacedLetters((prev) =>
          prev.map((l) => (l === letter ? "" : l)) // Remove from placed letters
        );
      }
    }
  };

  return (
    <div className="pageContent">
      <div className="orangeBar">Agent Marble is ...</div>

      <DndContext onDragEnd={handleDragEnd}>
        <h1>...wearing a...</h1>

        {/* Display Blanks */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          {placedLetters.map((letter, index) => (
            <Droppable key={index} id={`slot-${index}`}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  border: '2px dashed #6200ea',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                  touchAction: 'none', // Prevent default touch behavior
                  backgroundColor:
                    hintIndices.includes(index) || isSolved ? "transparent" : "transparent", // No background color for W
                  color: letter
                    ? isSolved
                      ? "#F9DF39" // Text color when correct
                      : "white"
                    : "transparent", // Empty slots have no text color
                  fontWeight: hintIndices.includes(index) ? "bold" : "normal", // Bold hint text
                }}
              >
                {hintIndices.includes(index) ? (
                  <span>{letter}</span> // Static hint letter (W)
                ) : (
                  letter && (
                    <Draggable id={letter} isDraggable={!isSolved}>
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: isSolved ? "transparent" : "#6200ea", // Remove background color after solved
                          color: isSolved ? "#F9DF39" : 'white', // Change letter color only when correct
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: isSolved ? 'default' : 'grab',
                          fontSize: '1.5rem',
                        }}
                      >
                        {letter}
                      </div>
                    </Draggable>
                  )
                )}
              </div>
            </Droppable>
          ))}
        </div>

        {/* Display Draggable Letters */}
        <Droppable id="pool">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              padding: '10px',
              border: '2px solid #ccc',
              borderRadius: '4px',
              minHeight: '60px',
              backgroundColor: '#f8f9fa',
            }}
          >
            {!isSolved &&
              remainingLetters.map((letter) => (
                <Draggable key={letter} id={letter}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#6200ea', // Keep purple background
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '4px',
                      cursor: 'grab',
                      fontSize: '1.5rem',
                    }}
                  >
                    {letter}
                  </div>
                </Draggable>
              ))}
          </div>
        </Droppable>
      </DndContext>
    </div>
  );
}

// Draggable Component
const Draggable = ({ id, children, isDraggable = true }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    touchAction: 'none', // Enable touch dragging
    cursor: isDraggable ? 'grab' : 'default',
    pointerEvents: isDraggable ? 'auto' : 'none', // Disable drag events when not draggable
  };

  return (
    <div ref={setNodeRef} style={style} {...(isDraggable ? listeners : {})} {...attributes}>
      {children}
    </div>
  );
};

// Droppable Component
const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
};

export default Marble;
