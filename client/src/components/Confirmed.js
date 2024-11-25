import SAUPic from '../assets/pictures/animatedSpiesLogo.gif';
import instagram from '../assets/pictures/instagram.webp';
import facebook from '../assets/pictures/facebook.webp';

import { useState } from 'react';


function Confirmed() {

  const [oneToggled, setOneToggled] = useState(false);
  const [twoToggled, setTwoToggled] = useState(false);
  const [threeToggled, setThreeToggled] = useState(false);
  const [fourToggled, setFourToggled] = useState(false);
  const [fiveToggled, setFiveToggled] = useState(false);
  const [sixToggled, setSixToggled] = useState(false);
  const [sevenToggled, setSevenToggled] = useState(false);
  const [eightToggled, setEightToggled] = useState(false);
  const [nineToggled, setNineToggled] = useState(false);
  const [tenToggled, setTenToggled] = useState(false);
  const [elevenToggled, setElevenToggled] = useState(false);
  const [twelveToggled, setTwelveToggled] = useState(false);


  return (
    <div className="pageContent" style={{paddingBottom:'10vw'}}>
      <div className='orangeBar'>MISSION: CONFIRMED</div>

      <div style={{alignContent: 'center', textAlign: 'center'}}>

        <br/>
        <br/>
        <br/>
        <div style={{fontSize: '8vw'}}>You will receive a text with instructions shortly.</div>
        <br/>
        <br/>
        <br/>

        <img src={SAUPic} alt="Spies Among Us" style={{ width: '85vw'}} />
        <br/>
        <br/>
        <br/>

      </div>

      <div className='greenBar' style={{color: '#F9DF39'}}>Questions?</div>
      <br/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setOneToggled(!oneToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>What exactly is this mission?</span>
        <span style={{ 
          transform: oneToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {oneToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          A spy is walking around Little Tokyo pretending to be shopping. You will receive texts, phone calls, and clues to discover what they are wearing and what they are doing. Your goal: correctly identify this undercover spy and decide their fate. There's jokes, a story, puzzles, and thrills!
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setTwoToggled(!twoToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>How long does it take?</span>
        <span style={{ 
          transform: twoToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {twoToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          The mission should take you from 60 to 90 minutes.
        </div>
      </div>}

      <div class="thinOrangeLine"/>


      <div 
        className='myHistoryDropdown' 
        onClick={() => setThreeToggled(!threeToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>How many people can play?</span>
        <span style={{ 
          transform: threeToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {threeToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          Up to two people can play together, but solo players are welcome.<br/>
          <br/>
          For groups larger than two, purchase tickets in the same time slots so the missions can start and end around the same time.
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setFourToggled(!fourToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Can I play by myself?</span>
        <span style={{ 
          transform: fourToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {fourToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          Yes! Spies Among Us is a great way to kill an hour and explore the area!
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setFiveToggled(!fiveToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Can kids play?</span>
        <span style={{ 
          transform: fiveToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {fiveToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          We recommend ages 12 and up to get the most out of the experience. Younger kids are welcome to participate and can help solve clues and search for the spy. A portion of the experience is navigating your phone so an adult is necessary to “drive” the experience.
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setSixToggled(!sixToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Is this experience outside?</span>
        <span style={{ 
          transform: sixToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {sixToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          Yes. If bad weather forces us to cancel your mission, we will issue you a refund and you can hopefully join us another day.
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setSevenToggled(!sevenToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Does this involve a lot of walking?</span>
        <span style={{ 
          transform: sevenToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {sevenToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          There will be between 1 and 1.5 miles of walking, but you are welcome to stop and rest as you like. All locations but one are wheelchair accessible, and we can direct you to a different location if needed.
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setEightToggled(!eightToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Do I need to download an app to play?</span>
        <span style={{ 
          transform: eightToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {eightToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          No! All the exciting stuff happens over texting, calling, web browser, or in person.
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setNineToggled(!nineToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>How does it work if I have more than two people in my group?</span>
        <span style={{ 
          transform: nineToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {nineToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          The missions are designed for groups of two players so we recommend splitting up. We will start the first team five minutes before the second team so that both groups will have their own experience but can end around the same time.
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setTenToggled(!tenToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>What are your terms and conditions?</span>
        <span style={{ 
          transform: tenToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {tenToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          Located <a href="./terms" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(255,55,0)'}}>here</a>!
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setElevenToggled(!elevenToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>What data do you collect?</span>
        <span style={{ 
          transform: elevenToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {elevenToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          We collect your phone number and email to send clues to you for up to 24 hours. We may continue to send you marketing email updates with new shows that you can opt out of. We will never share or sell your data. Full privacy policy <a href="./privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(255,55,0)'}}>here</a>.
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setTwelveToggled(!twelveToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>I have a question not listed here!</span>
        <span style={{ 
          transform: twelveToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {twelveToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="confirmedDropdownText" >
          Drop us an email at <a target="_top" style={{ color: 'rgb(255,55,0)'}} href="mailto:contact@interactiveescapes.com" rel="noopener">contact@interactiveescapes.com</a>.
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div style={{ fontSize: '5vw', textAlign: 'center', marginTop: '30vw'}}>
        <a href='https://www.instagram.com/spiesamong' target='_blank' rel="noreferrer"><img src={instagram} alt="Instagram" style={{ width: '10vw', marginBottom: '0', paddingBottom: '0'}}></img></a>
        <a href='https://www.facebook.com/spiesamong' target='_blank' rel="noreferrer"><img src={facebook} alt="Facebook" style={{ width: '10vw', marginBottom: '0', paddingBottom: '0'}}></img></a>
        <div style={{fontWeight: "normal"}}>2024 Interactive Escapes</div>
      </div>

    </div>
  )
}

export default Confirmed;