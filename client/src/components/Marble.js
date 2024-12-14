import { useState } from "react";

import LeslieFooter from "./LeslieFooter.js";

function Marble() {
  const initialPuzzleWords = {
    swan: "_W__",
    necklace: "__C__AC_",
    marble: "M___LE",
    danger: "D____R",
    signal: "S____L",
    vui: "V__",
    ve: "V_",
    cup: "__P",
    blue: "___E",
    jeans: "J__NS",
    black: "_____",
    hat: "_AT"
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
    <div className="pageContent" style={{paddingBottom: '0vw'}}>
      <div className="orangeBar" style={{height: '13vw'}}>Agent Marble is ...</div>

      <div className="puzzleContainer">

        <div className="swanNecklaceContainer">

          <div className="marbleIs">...wearing a...</div>

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

        </div>

        <div className="MDSVVCFlex">

          <div className="MDSContainer">

            <div className="marbleIs">...showing the...</div>

            {/* Render buttons for MARBLE */}
            {puzzleWords.marble.split("").map((char, index) => (
              <button
                key={`marble-${index}`}
                data-word="marble"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.marble === "MARBLE" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}

            <br />

            {/* Render buttons for DANGER */}
            {puzzleWords.danger.split("").map((char, index) => (
              <button
                key={`danger-${index}`}
                data-word="danger"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.danger === "DANGER" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}

            <br />

            {/* Render buttons for SIGNAL */}
            {puzzleWords.signal.split("").map((char, index) => (
              <button
                key={`signal-${index}`}
                data-word="signal"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.signal === "SIGNAL" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}

          </div>

          <div className="vuiVeCupContainer">

            <div className="marbleIs">...holding a...</div>

            {/* Render buttons for VUI */}
            {puzzleWords.vui.split("").map((char, index) => (
              <button
                key={`vui-${index}`}
                data-word="vui"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.vui === "VUI" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}

            <br />

            {/* Render buttons for VE */}
            {puzzleWords.ve.split("").map((char, index) => (
              <button
                key={`ve-${index}`}
                data-word="ve"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.ve === "VE" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}

            <br />

            {/* Render buttons for CUP */}
            {puzzleWords.cup.split("").map((char, index) => (
              <button
                key={`cup-${index}`}
                data-word="cup"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.cup === "CUP" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}

          </div>

        </div>

        <div className="clothingFlex">

          <div className="blueJeansContainer">

            <div className="marbleIs">...wearing...</div>

            {/* Render buttons for BLUE */}
            {puzzleWords.blue.split("").map((char, index) => (
              <button
                key={`blue-${index}`}
                data-word="blue"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.blue === "BLUE" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}
            
            <br />

            {/* Render buttons for JEANS */}
            {puzzleWords.jeans.split("").map((char, index) => (
              <button
                key={`jeans-${index}`}
                data-word="jeans"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.jeans === "JEANS" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}

          </div>

          <div className="blackHatContainer">

            <div className="marbleIs">...wearing a...</div>

            {/* Render buttons for BLACK */}
            {puzzleWords.black.split("").map((char, index) => (
              <button
                key={`black-${index}`}
                data-word="black"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.black === "BLACK" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}

            <br />

            {/* Render buttons for HAT */}
            {puzzleWords.hat.split("").map((char, index) => (
              <button
                key={`hat-${index}`}
                data-word="hat"
                data-index={index}
                onClick={char === "_" ? handleLetterPlacement : null}
                disabled={char !== "_"}
                style={{
                  backgroundColor: puzzleWords.hat === "HAT" ? "yellow" : "white",
                  color: "black",
                  cursor: char !== "_" ? "not-allowed" : "pointer",
                }}
                className="marbleButton"
              >
                {char}
              </button>
            ))}

          </div>

        </div>

        <br />

        <div className="marbleInstructions">Tap a letter below and then tap the space where it belongs above!</div>

        <br />

        <div className="lettersContainer">

          {/* Render available letters */}
          {availableLetters.map((item, index) => (
            <button
              key={`${item.id}-${item.letter}-${index}`} // Combine id and letter for uniqueness
              value={item.letter}
              data-id={item.id}
              onClick={handleLetterSelect}
              className="marbleButton"
              style={{
                backgroundColor: selectedLetter?.id === item.id ? "grey" : "white",
                color: selectedLetter?.id === item.id ? "white" : "black",
              }}
            >
              {item.letter}
            </button>
          ))}

        </div>

        <br/>
        

        <div className="resetButtonContainer">
          <button
            onClick={resetUnsolvedWords}
            className="resetButton"
          >
            Reset Letters
          </button>
        </div>


      </div>

      <LeslieFooter />
    </div>
  );
}

export default Marble;