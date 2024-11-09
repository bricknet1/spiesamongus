import LeslieFooter from "./LeslieFooter.js";
import papyrusPic from '../assets/pictures/Papyrus Portrait with medal 12.5.23.jpg';
import { useState } from 'react';


function Myprofile() {

  const [missionToggled, setMissionToggled] = useState(false);
  const [lunchToggled, setLunchToggled] = useState(false);

  return (
    <div>
      <div className='pageContent'>

        <title>My Profile (Agent Papyrus)</title>

        <div className='greenBar'>MY PROFILE</div>

        <div className="myprofile-header">Welcome, Agent Papyrus</div>

        <div className="papyrusPicWrapper">
          <img src={papyrusPic} className="papyrusPic" alt="Agent Papyrus" />
        </div>

        <div className="myprofile-subheader">Senior Agent, 18 year veteran</div>

        <div className='greenBar'>CRUCIAL INTEL FOR TODAY</div>

        <div 
          className='myprofileDropdown' 
          onClick={() => setMissionToggled(!missionToggled)} 
          style={{ cursor: 'pointer'}}>
          Today's Mission CLASSIFIED (Click to declassify)
          {missionToggled===false && <span>▼</span>}
          {missionToggled===true && <span style={{ display: 'inline-block', transform: 'rotate(180deg)', 'margin-bottom': '20vw' }}>▼</span>}
        </div>

        <div class="thinOrangeLine"/>

        <div className='myprofileDropdown' 
          onClick={() => setLunchToggled(!lunchToggled)} 
          style={{ cursor: 'pointer'}}>
          Today's Lunch Special
          {lunchToggled===false && <span>▼</span>}
          {lunchToggled===true && <span style={{ display: 'inline-block', transform: 'rotate(180deg)', 'margin-bottom': '20vw' }}>▼</span>}
        </div>

        <div class="thinOrangeLine"/>

        <div className='greenBar'>MY MISSION HISTORY</div>

        <div className='missionHistoryText'>Agent Papyrus, click <a style={{color:'#f9df39'}} href='./myhistory'>here</a> to review your past missions. Most of this information won't help you with today's mission, but we understand you like to reminisce.</div>

        <div className='greenBar'>HR DATABASE</div>

      </div>

      <LeslieFooter />

    </div>
  );
}

export default Myprofile;
