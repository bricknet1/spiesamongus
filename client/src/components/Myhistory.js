import notepadPic from '../assets/pictures/personal notes.jpg';

import { useState } from 'react';


function Myhistory() {

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


  return (
    <div className="pageContent">
      <title>My Mission History (Agent Papyrus)</title>
      <div className='greenBar'>MY MISSION HISTORY</div>

      <div className="ovalPicWrapper">
        <img src={notepadPic} className="ovalPic" alt="notepad" />
      </div>

      <div className='myHistoryHeading'>Agent Papyrus, click on a mission below to see your personal notes.</div>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setOneToggled(!oneToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>OPERATION FILTHY LAUNDRY (ongoing)</span>
        <span style={{ 
          transform: oneToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {oneToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
        betrayal was the appetizer, but I'm about to serve up a dish best served cold: Getting Even Gazpacho
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setTwoToggled(!twoToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>OPERATION DIRTY LAUNDRY</span>
        <span style={{ 
          transform: twoToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {twoToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
          my only failed mission…
        </div>
      </div>}

      <div class="thinOrangeLine"/>


      <div 
        className='myHistoryDropdown' 
        onClick={() => setThreeToggled(!threeToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>OPERATION BUBONIC CURTSY*</span>
        <span style={{ 
          transform: threeToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {threeToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
          whoops, I guess that's two failed missions. No thanks to Marble, that traitor.
        </div>
        <div className="myHistoryDropdownTextSpecial" >
          Open Mission File <a style={{color:'#f9df39'}} href='./opbc' target="_blank">here.</a><br/>
          <br/>
          *Reminder to never leave your passwords out in your office. That's a big security no-no!<br/>
          -Leslie from HR
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setFourToggled(!fourToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>UNLOCK THE REAMER ASSIGNMENT</span>
        <span style={{ 
          transform: fourToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {fourToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
          who's scarier? The scariest person ever made? Or the guy that found him
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setFiveToggled(!fiveToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>HAVANA SYNDROME ROUND ROBIN</span>
        <span style={{ 
          transform: fiveToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {fiveToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
          you're welcome America! You'll thank me in about twenty years
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setSixToggled(!sixToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>EXPEDITION GOOSE MURDER</span>
        <span style={{ 
          transform: sixToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {sixToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
          it's not what it sounds like
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setSevenToggled(!sevenToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>THE GOOSE STRANGLE CHALLENGE</span>
        <span style={{ 
          transform: sevenToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {sevenToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
          sigh, this is exactly what it sounds like
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setEightToggled(!eightToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>MISSION: INVOLUNTARY U2 DOWNLOAD</span>
        <span style={{ 
          transform: eightToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {eightToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
          heh, Bono owes me for that one
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setNineToggled(!nineToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>OPERATION CHENEY TRAIN HEIST</span>
        <span style={{ 
          transform: nineToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {nineToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
          ah I guess I have three failed missions. huh.
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='myHistoryDropdown' 
        onClick={() => setTenToggled(!tenToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>THE QUEST FOR THE SILVER OBELISK</span>
        <span style={{ 
          transform: tenToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {tenToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="myHistoryDropdownText" >
          don't let anyone tell you different. I found that Obelisk! Who are you going to believe? Me? Or Jane Goodall?
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div className="myHistoryFooter">For older missions, please upgrade to HR Pro™</div>

    </div>
  )
}

export default Myhistory;