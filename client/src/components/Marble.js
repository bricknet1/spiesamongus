import { useState } from "react";

import LeslieFooter from "./LeslieFooter.js";

function Marble() {
  const initialPuzzleWords = {
    swan: "_W__",
    necklace: "__C__AC_",
  };
  const initialAvailableLetters = [
    { letter: "R", id: 0 },
    { letter: "E", id: 1 },
    { letter: "U", id: 2 },
    { letter: "G", id: 3 },
    { letter: "E", id: 4 },
    { letter: "N", id: 5 },
    { letter: "K", id: 6 },
    { letter: "U", id: 7 },
    { letter: "L", id: 8 },
    { letter: "A", id: 9 },
    { letter: "E", id: 10 },
    { letter: "A", id: 11 },
    { letter: "S", id: 12 },
    { letter: "N", id: 13 },
    { letter: "A", id: 14 },
    { letter: "B", id: 15 },
    { letter: "I", id: 16 },
    { letter: "E", id: 17 },
    { letter: "K", id: 18 },
    { letter: "U", id: 19 },
    { letter: "A", id: 20 },
    { letter: "G", id: 21 },
    { letter: "B", id: 22 },
    { letter: "N", id: 23 },
    { letter: "H", id: 24 },
    { letter: "B", id: 25 },
    { letter: "A", id: 26 },
    { letter: "C", id: 27 },
    { letter: "I", id: 28 },
    { letter: "A", id: 29 },
    { letter: "L", id: 30 },
    { letter: "C", id: 31 },
    { letter: "N", id: 32 },
    { letter: "E", id: 33 },
    { letter: "L", id: 34 },
  ]
  const [selectedLetter, setSelectedLetter] = useState(null); // Store both value and ID
  const [puzzleWords, setPuzzleWords] = useState(initialPuzzleWords);
  const [availableLetters, setAvailableLetters] = useState(initialAvailableLetters);

  function handleLetterSelect(e) {
    e.preventDefault();
    const { value, dataset } = e.target;
    const id = parseInt(dataset.id, 10);
    setSelectedLetter({ letter: value, id }); // Track the letter and its ID
  }

  function handleLetterPlacement(e) {
    e.preventDefault();
    const { word, index } = e.target.dataset; // Access word and index dynamically
    const wordIndex = parseInt(index, 10); // Convert to a number
  
    if (word && selectedLetter) {
      setPuzzleWords((prevWords) => {
        const currentWord = prevWords[word];
        // Prevent altering already-placed letters
        if (currentWord[wordIndex] !== "_") {
          return prevWords; // Return without changes
        }
  
        // Update the word if the slot is empty
        const updatedWord =
          currentWord.slice(0, wordIndex) +
          selectedLetter.letter +
          currentWord.slice(wordIndex + 1);
  
        return {
          ...prevWords,
          [word]: updatedWord,
        };
      });
  
      // Remove the selected letter from available letters
      setAvailableLetters((prevLetters) =>
        prevLetters.filter((item) => item.id !== selectedLetter.id)
      );
  
      setSelectedLetter(null); // Clear the selected letter
    }
  }

  function resetUnsolvedWords() {
    setPuzzleWords((prevWords) => {
      const resetWords = {};
      const usedLetters = []; // Track letters in unsolved words for resetting
  
      for (const [word, value] of Object.entries(prevWords)) {
        if (value !== word.toUpperCase()) {
          // Reset only unsolved words and collect used letters
          const initialWord = initialPuzzleWords[word];
          resetWords[word] = initialWord;
  
          // Collect letters from the unsolved word
          for (let i = 0; i < value.length; i++) {
            if (value[i] !== "_" && initialWord[i] === "_") {
              usedLetters.push(value[i]);
            }
          }
        } else {
          resetWords[word] = value; // Keep solved words as they are
        }
      }
  
      // Merge unsolved word letters into available letters
      setAvailableLetters((prevAvailable) => {
        const resetLetters = usedLetters.map((letter) => {
          // Find a unique ID for each used letter
          const match = initialAvailableLetters.find(
            (l) => l.letter === letter && !prevAvailable.some((a) => a.id === l.id)
          );
          return match || null; // Ensure we only add valid matches
        }).filter(Boolean); // Remove nulls
  
        return [...prevAvailable, ...resetLetters];
      });
  
      return resetWords;
    });
  }
  
  

  return (
    <div className="pageContent">
      <div className="orangeBar">Agent Marble is ...</div>

      <div>...wearing a...</div>

      {/* Render buttons for SWAN */}
      {puzzleWords.swan.split("").map((char, index) => (
        <button
          key={`swan-${index}`}
          data-word="swan"
          data-index={index}
          onClick={char === "_" ? handleLetterPlacement : null} // Prevent onClick for non-alterable letters
          disabled={char !== "_"} // Disable buttons for non-alterable letters
          style={{
            backgroundColor: puzzleWords.swan === "SWAN" ? "yellow" : "white",
            color: "black",
            cursor: char !== "_" ? "not-allowed" : "pointer", // Visual indication for disabled
          }}
          className="marbleButton"
        >
          {char}
        </button>
      ))}

      <br />

      {/* Render buttons for NECKLACE */}
      {puzzleWords.necklace.split("").map((char, index) => (
        <button
          key={`necklace-${index}`}
          data-word="necklace"
          data-index={index}
          onClick={char === "_" ? handleLetterPlacement : null} // Prevent onClick for non-alterable letters
          disabled={char !== "_"} // Disable buttons for non-alterable letters
          style={{
            backgroundColor: puzzleWords.necklace === "NECKLACE" ? "yellow" : "white",
            color: "black",
            cursor: char !== "_" ? "not-allowed" : "pointer", // Visual indication for disabled
          }}
          className="marbleButton"
        >
          {char}
        </button>
      ))}

      <br />
      <br />

      {/* Render available letters */}
      {availableLetters.map((item) => (
        <button
          key={item.id} // Unique key
          value={item.letter}
          data-id={item.id} // Pass unique ID
          onClick={handleLetterSelect}
          className="marbleButton"
        >
          {item.letter}
        </button>
      ))}

      <br/>

      <button
        onClick={resetUnsolvedWords}
        className="resetButton"
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Reset Letters
      </button>

      <LeslieFooter />
    </div>
  );
}

export default Marble;