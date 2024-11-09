import LeslieFooter from "./LeslieFooter.js";
import SearchDylan from "./SearchDylan.js";
import SearchLeslie from "./SearchLeslie.js";
import SearchMarble from "./SearchMarble.js";
import SearchMDS from "./SearchMDS.js";
import SearchObelisk from "./SearchObelisk.js";
import SearchOPBC from "./SearchOPBC.js";
import SearchPapyrus from "./SearchPapyrus.js";
import SearchReamer from "./SearchReamer.js";
import SearchRookie from "./SearchRookie.js";
import SearchShale from "./SearchShale.js";

import papyrusPic from '../assets/pictures/Papyrus Portrait with medal 12.5.23.jpg';
import filesPic from '../assets/pictures/Files.jpg';

import { useState } from 'react';


function Myprofile() {

  const [missionToggled, setMissionToggled] = useState(false);
  const [lunchToggled, setLunchToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');

  const acceptableSearchTerms = ['LESLIE', 'DYLAN', 'MARBLE', 'MDS', 'MARBLE DANGER SIGNAL', 'OBELISK', 'PAPYRUS', 'REAMER', 'OPERATION BC', 'OPERATION BUBONIC CURTSY', 'ROOKIE', 'SHALE', '']

  function handleSubmit(e) {
    e.preventDefault();
    const valueCaps = searchTerm.toUpperCase()
    console.log("Submitted value:", valueCaps);
    setSubmittedSearchTerm(valueCaps)
  }

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

        <div className="filesPicWrapper">
          <img src={filesPic} className="filesPic" alt="Files" />
        </div>

        <div className='missionHistoryText'>For company records, enter the subject matter here and we will pull up the relevant files:</div>

        <form onSubmit={handleSubmit} className="opbcPageForm">

            <input
              type="text" 
              name="searchTerm"
              className="passwordFormField"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button type="submit" className="passwordButton">Search</button>

          </form>

          {submittedSearchTerm === "" && <div></div>}
          {submittedSearchTerm === "DYLAN" && <SearchDylan />}
          {submittedSearchTerm === "LESLIE" && <SearchLeslie />}
          {(submittedSearchTerm === "MDS" || submittedSearchTerm === "MARBLE DANGER SIGNAL") && <SearchMDS />}
          {submittedSearchTerm === "MARBLE" && <SearchMarble />}
          {submittedSearchTerm === "OBELISK" && <SearchObelisk />}
          {submittedSearchTerm === "PAPYRUS" && <SearchPapyrus />}
          {submittedSearchTerm === "REAMER" && <SearchReamer />}
          {(submittedSearchTerm === "OPERATION BC" || submittedSearchTerm === "OPERATION BUBONIC CURTSY") && <SearchOPBC />}
          {submittedSearchTerm === "ROOKIE" && <SearchRookie />}
          {submittedSearchTerm === "SHALE" && <SearchShale />}
          {!acceptableSearchTerms.includes(submittedSearchTerm) && <div><div class="orangeLine"/><div className='myprofile-header'>No Files Found for '{submittedSearchTerm}'</div><div class="orangeLine"/></div>}
          

      </div>

      <LeslieFooter />

    </div>
  );
}

export default Myprofile;
