import { useState } from "react";

function Marble() {
  const [selectedLetter, setSelectedLetter] = useState(null); // Store both value and index
  const [swan, setSwan] = useState("_W__");
  const [availableLetters, setAvailableLetters] = useState([
    { letter: "S", id: 0 },
    { letter: "A", id: 1 },
    { letter: "N", id: 2 },
    { letter: "S", id: 3 },
    { letter: "X", id: 4 },
  ]);

  function handleLetterSelect(e) {
    e.preventDefault();
    const { value, dataset } = e.target;
    const id = parseInt(dataset.id, 10);
    setSelectedLetter({ letter: value, id }); // Track the letter and its ID
  }

  function handleLetterPlacement(e) {
    e.preventDefault();
    const swanIndex = e.target.dataset.swanIndex; // Access the data attribute
    const index = parseInt(swanIndex, 10); // Convert to a number
    if (selectedLetter) {
      setSwan(swan.slice(0, index) + selectedLetter.letter + swan.slice(index + 1));

      // Remove the specific letter by ID
      setAvailableLetters((prevLetters) =>
        prevLetters.filter((item) => item.id !== selectedLetter.id)
      );

      setSelectedLetter(null); // Clear the selected letter
    }
  }

  console.log(swan);

  return (
    <div className="pageContent">
      <div className="orangeBar">Agent Marble is ...</div>

      <div>...wearing a...</div>

      <button
        data-swan-index="0"
        onClick={handleLetterPlacement}
        style={{ backgroundColor: swan === "SWAN" ? "yellow" : "white" }}
      >
        {swan[0]}
      </button>
      <button style={{ backgroundColor: swan === "SWAN" ? "yellow" : "white" }}>
        W
      </button>
      <button
        data-swan-index="2"
        onClick={handleLetterPlacement}
        style={{ backgroundColor: swan === "SWAN" ? "yellow" : "white" }}
      >
        {swan[2]}
      </button>
      <button
        data-swan-index="3"
        onClick={handleLetterPlacement}
        style={{ backgroundColor: swan === "SWAN" ? "yellow" : "white" }}
      >
        {swan[3]}
      </button>

      <br />
      <br />
      <br />

      {availableLetters.map((item) => (
        <button
          key={item.id} // Unique key
          value={item.letter}
          data-id={item.id} // Pass unique ID
          onClick={handleLetterSelect}
        >
          {item.letter}
        </button>
      ))}
    </div>
  );
}

export default Marble;
