import marbleSignalPic from '../assets/pictures/MDS 11.20.23.jpg';


function SearchMDS() {

  return (
    <div>
      <div className='greenBar'>MDS FILES</div>

      <div className='searchBody'>
        <br/>
        Invented by former  agent / current traitor Marble, the <u>Marble Danger Signal</u> is a method for agents to secretly indicate they are in danger.
        <br/>
        <br/>
        To properly use it, agents should display only two fingers, whether by holding something or gesturing.
        <br/>
      </div>

      <div className='searchHeading'>Examples of the MDS in use:</div>

      <img src={marbleSignalPic} className="otherSearchImage" alt="Three agents using a 2-finger signal" />

    </div>
  )
}

export default SearchMDS;