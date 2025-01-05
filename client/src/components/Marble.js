import { useState, useEffect } from "react";

import LeslieFooter from "./LeslieFooter.js";

import yellowMan from "../assets/pictures/stickfigureyellowwalk.png";

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
    hat: "_AT",
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
  ];
  const [selectedLetter, setSelectedLetter] = useState(null); // Store both value and ID
  const [puzzleWords, setPuzzleWords] = useState(initialPuzzleWords);
  const [availableLetters, setAvailableLetters] = useState(
    initialAvailableLetters
  );
  const [isBorderVisible, setIsBorderVisible] = useState(false);
  const [isFirstLetterPlaced, setIsFirstLetterPlaced] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBorderVisible((prev) => !prev); // Toggle border visibility
    }, 1000); // 1-second interval

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    const savedPuzzleWords = JSON.parse(localStorage.getItem("puzzleWords"));
    const savedAvailableLetters = JSON.parse(
      localStorage.getItem("availableLetters")
    );

    if (savedPuzzleWords) {
      setPuzzleWords(savedPuzzleWords);
    }
    if (savedAvailableLetters) {
      setAvailableLetters(savedAvailableLetters);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("puzzleWords", JSON.stringify(puzzleWords));
    localStorage.setItem("availableLetters", JSON.stringify(availableLetters));
  }, [puzzleWords, availableLetters]);

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

      setIsFirstLetterPlaced(true);
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
        // setrack the ids of letters that have been added to resetLetters
        const addedIds = new Set(prevAvailable.map((a) => a.id));

        const resetLetters = usedLetters
          .map((letter) => {
            // Find a unique ID for each used letter, ensuring we haven't already added that ID
            const match = initialAvailableLetters.find(
              (l) =>
                l.letter === letter &&
                !addedIds.has(l.id) && // Check if this id has already been added
                !prevAvailable.some((a) => a.id === l.id) // Also check if the id exists in prevAvailable
            );

            if (match) {
              // Add the match id to the addedIds set
              addedIds.add(match.id);
            }

            return match || null; // Ensure we only add valid matches
          })
          .filter(Boolean); // Remove nulls

        console.log("reset letters: ", resetLetters);
        console.log("available letters: ", availableLetters);
        return [...prevAvailable, ...resetLetters];
      });

      return resetWords;
    });
  }

  function areAllWordsSolved() {
    return Object.entries(puzzleWords).every(
      ([word, value]) => value === word.toUpperCase()
    );
  }
  

  // TEMPORARY
  function resetGame() {
    setAvailableLetters(initialAvailableLetters)
    setPuzzleWords(initialPuzzleWords)
  }

  function solveGame(){
    setAvailableLetters([])
    setPuzzleWords({
      swan: "SWAN",
      necklace: "NECKLACE",
      marble: "MARBLE",
      danger: "DANGER",
      signal: "SIGNAL",
      vui: "VUI",
      ve: "VE",
      cup: "CUP",
      blue: "BLUE",
      jeans: "JEANS",
      black: "BLACK",
      hat: "HAT",
    })
  }
  // TEMPORARY



  return (
    <div className="pageContent">
      <title>Agent Marble Physical Description</title>
      <div className="orangeBar" style={{ height: "13vw" }}>
        Agent Marble is ...
      </div>

      <div className="puzzleContainer">
        <div className="marbleUpperFlex">
          <div className="swanNecklaceContainer">
            <div
              className={
                puzzleWords.swan === "SWAN" ||
                puzzleWords.necklace === "NECKLACE"
                  ? "marbleIsSolved"
                  : "marbleIs"
              }
            >
              ...wearing a...
            </div>

            {/* Render buttons for SWAN */}
            {puzzleWords.swan.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.swan[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.swan === "SWAN";
              return (
                <button
                  key={`swan-${index}`}
                  data-word="swan"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}

            <br />

            {/* Render buttons for NECKLACE */}
            {puzzleWords.necklace.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.necklace[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.necklace === "NECKLACE";
              return (
                <button
                  key={`necklace-${index}`}
                  data-word="necklace"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}
          </div>

          <div className="blackHatContainer">
            <div
              className={
                puzzleWords.black === "BLACK" || puzzleWords.hat === "HAT"
                  ? "marbleIsSolved"
                  : "marbleIs"
              }
            >
              ...wearing a...
            </div>

            {/* Render buttons for BLACK */}
            {puzzleWords.black.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.black[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.black === "BLACK";
              return (
                <button
                  key={`black-${index}`}
                  data-word="black"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}

            <br />

            {/* Render buttons for HAT */}
            {puzzleWords.hat.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.hat[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.hat === "HAT";
              return (
                <button
                  key={`hat-${index}`}
                  data-word="hat"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}
          </div>
        </div>

        <div className="marbleLowerFlex">
          <div className="leftSideContainer">
            <div
              className={
                puzzleWords.marble === "MARBLE" ||
                puzzleWords.danger === "DANGER" ||
                puzzleWords.signal === "SIGNAL"
                  ? "marbleIsSolved"
                  : "marbleIs"
              }
            >
              ...showing the...
            </div>

            {/* Render buttons for MARBLE */}
            {puzzleWords.marble.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.marble[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.marble === "MARBLE";
              return (
                <button
                  key={`marble-${index}`}
                  data-word="marble"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}

            <br />

            {/* Render buttons for DANGER */}
            {puzzleWords.danger.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.danger[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.danger === "DANGER";
              return (
                <button
                  key={`danger-${index}`}
                  data-word="danger"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}

            <br />

            {/* Render buttons for SIGNAL */}
            {puzzleWords.signal.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.signal[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.signal === "SIGNAL";
              return (
                <button
                  key={`signal-${index}`}
                  data-word="signal"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}

            <br />

            <div
              className={
                puzzleWords.vui === "VUI" ||
                puzzleWords.ve === "VE" ||
                puzzleWords.cup === "CUP"
                  ? "marbleIsSolved"
                  : "marbleIs"
              }
            >
              ...holding a...
            </div>

            {/* Render buttons for VUI */}
            {puzzleWords.vui.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.vui[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.vui === "VUI";
              return (
                <button
                  key={`vui-${index}`}
                  data-word="vui"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}

            <button className="lockedLetter"></button>

            {/* Render buttons for VE */}
            {puzzleWords.ve.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.ve[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.ve === "VE";
              return (
                <button
                  key={`ve-${index}`}
                  data-word="ve"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}

            <br />

            {/* Render buttons for CUP */}
            {puzzleWords.cup.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.cup[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.cup === "CUP";
              return (
                <button
                  key={`cup-${index}`}
                  data-word="cup"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}

            <div
              className={
                puzzleWords.blue === "BLUE" || puzzleWords.jeans === "JEANS"
                  ? "marbleIsSolved"
                  : "marbleIs"
              }
            >
              ...wearing...
            </div>

            {/* Render buttons for BLUE */}
            {puzzleWords.blue.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.blue[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.blue === "BLUE";
              return (
                <button
                  key={`blue-${index}`}
                  data-word="blue"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}

            <br />

            {/* Render buttons for JEANS */}
            {puzzleWords.jeans.split("").map((char, index) => {
              const isLockedLetter = initialPuzzleWords.jeans[index] !== "_"; // Check if the letter was pre-provided
              const wordIsSolved = puzzleWords.jeans === "JEANS";
              return (
                <button
                  key={`jeans-${index}`}
                  data-word="jeans"
                  data-index={index}
                  onClick={char === "_" ? handleLetterPlacement : null}
                  disabled={isLockedLetter || char !== "_"} // Prevent interaction for locked letters
                  className={
                    wordIsSolved
                      ? "solvedWordLetter" // Highest priority when word is solved
                      : isLockedLetter
                      ? "lockedLetter" // Pre-provided letters
                      : "marbleButton" // Default for user-interactable letters
                  }
                >
                  {char === "_" ? "\u00A0" : char}
                </button>
              );
            })}
          </div>

          <img src={yellowMan} className="yellowMan" alt="walking man"/>
        </div>

        <br />

        {areAllWordsSolved() ? (
          <div className="marbleInstructions">SUCCESS!</div>
        ) : isFirstLetterPlaced ? <div className="marbleInstructions"><br/><br/></div> : (
          <div className="marbleInstructions">
            Tap a letter below and then tap the space where it belongs above!
          </div>
        )}

        <br />

        {areAllWordsSolved() ? (
          <div
            className="marbleCompletionMessage"
            style={{
              border: isBorderVisible
                ? "2px solid red"
                : "2px solid transparent", // Apply border conditionally
              padding: "10px", // Optional: Adjust spacing for better appearance
            }}
          >
            NOW TEXT PAPYRUS
            <br />
            "READY FOR ACTION"
          </div>
        ) : (
          <div className="lettersContainer">
            {availableLetters.map((item, index) => (
              <button
                key={`${item.id}-${item.letter}-${index}`}
                value={item.letter}
                data-id={item.id}
                onClick={handleLetterSelect}
                className="marbleButton"
                style={{
                  backgroundColor:
                    selectedLetter?.id === item.id ? "grey" : "white",
                  color: selectedLetter?.id === item.id ? "white" : "black",
                  border: "none", // remove border
                  margin: "2px", // remove border
                  width: "6vw", // remove border
                  height: "6vw", // remove border
                  paddingTop: "1px", // remove border
                }}
              >
                {item.letter}
              </button>
            ))}
          </div>
        )}

        <br />

        {areAllWordsSolved() ? null : (
          <div className="resetButtonContainer">
            <button onClick={resetUnsolvedWords} className="resetButton">
              Reset Letters
            </button>
          </div>
        )}


        {/* temporary */}
        <div className="resetButtonContainer">
          <button onClick={resetGame} className="resetButton">
            TEMP Reset Game
          </button>
          <button onClick={solveGame} className="resetButton">
            TEMP Solve Game
          </button>
        </div>
        {/* temporary */}



      </div>

      <LeslieFooter />
    </div>
  );
}

export default Marble;

// o   Tapping a placed letter (that is part of an unsolved word) should return it to the pool

// ·       Visual

// o   Make the instructions disappear after you move your first letter (gives us more real estate to work with on the site)

