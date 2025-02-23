import LeslieFooter from "./LeslieFooter.js";
import SearchDylan from "./searchResults/SearchDylan.js";
import SearchLeslie from "./searchResults/SearchLeslie.js";
import SearchMarble from "./searchResults/SearchMarble.js";
import SearchMDS from "./searchResults/SearchMDS.js";
import SearchObelisk from "./searchResults/SearchObelisk.js";
import SearchOPBC from "./searchResults/SearchOPBC.js";
import SearchPapyrus from "./searchResults/SearchPapyrus.js";
import SearchReamer from "./searchResults/SearchReamer.js";
import SearchRookie from "./searchResults/SearchRookie.js";
import SearchShale from "./searchResults/SearchShale.js";

import papyrusPic from '../assets/pictures/Papyrus Portrait with medal 12.5.23.jpg';
import filesPic from '../assets/pictures/Files.jpg';
import laundryPic from '../assets/pictures/laundry no bg.png';
import banhmiPic from '../assets/pictures/banh mi.jpg';

import { useState } from 'react';


function Myprofile() {

  const [missionToggled, setMissionToggled] = useState(false);
  const [lunchToggled, setLunchToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');

  const acceptableSearchTerms = ['LESLIE', 'DYLAN', 'MARBLE', "MDS", "MARBLE DANGER SIGNAL", "MD SIGNAL", 'OBELISK', "PAPYRUS", "PAPRYS", "PAPYRS", 'REAMER', "OPERATION BC", "OPERATION BUBONIC CURTSY", "BUBONIC CURTSY", "BUBONIC CURTSEY", "BUBONIC CURTAY", "OPERATIONBC", "OPBC", "OP BC", 'ROOKIE', 'SHALE', 'SHAKE', '']

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
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span>Today's Mission CLASSIFIED (Click to declassify)</span>
          <span style={{ 
            transform: missionToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.3s ease' 
            }}>
            ▼
          </span>
        </div>
        {missionToggled===true && <div style={{ marginTop: '20px' }}>
          <img src={laundryPic} className="myProfileDropdownImage" alt="Dirty Laundry" />
          <div className="myprofileDropdownText" >
            <u style={{fontWeight: "bold", fontSize: "6vw"}}>OPERATION FILTHY LAUNDRY</u><br/>
            <br/>
            Agent Papyrus,<br/>
            <br/>
            We're so sorry it has come to this.<br/>
            <br/>
            Your mission: Apprehend your former student, Agent Marble, and bring them to justice.<br/>
            <br/>
            On that despicable day, they betrayed their country. They betrayed you. But most importantly, they betrayed our agency. And now, five years later, we're finally going to pay them back.<br/>
            <br/>
            <u style={{fontWeight: "bold", fontSize: "6vw"}}>YOUR MISSION DETAILS (AGENT PAPYRUS)</u><br/>
            <br/>
            You will be on a window stake out while your new student / agent Rookie works the field.<br/>
            <br/>
            Lunch will be provided for you. Agent Rookie will not receive lunch so please don't brag about your lunch to them.<br/>
            <br/>
            Finally, we hope it goes without saying to never share your password.<br/>
            <br/>
            <u style={{fontWeight: "bold", fontSize: "6vw"}}>***INFORMATION TO SHARE WITH AGENT ROOKIE BELOW***</u><br/>
            <br/>
            Our below average code-breaking team is sifting through data on Marble but currently they can only confirm they are wearing <u><strong style={{fontWeight: "normal"}}>jeans</strong></u> and an <u><strong style={{fontWeight: "normal"}}>animal necklace</strong></u>.<br/>
            <br/>
          </div>
        </div>}

        <div class="thinOrangeLine"/>

        <div className='myprofileDropdown' 
          onClick={() => setLunchToggled(!lunchToggled)} 
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          Today's Lunch Special
          <span style={{ 
            transform: lunchToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.3s ease' 
            }}>
            ▼
          </span>
        </div>
        {lunchToggled===true && <div style={{ marginTop: '20px' }}>
          <div className="myprofileDropdownText">
            <b style={{ fontSize: "6vw"}}>Bahn Mi</b><br/>
            Choose one: Chicken, Beef, Tofu.<br/>
            <br/>
            Comes with: pickled carrots & daikon, cucumber, red onion, cilantro, miso spread, and spicy mayo
          </div>
          <img src={banhmiPic} className="myProfileDropdownImage" alt="Banh Mi" />
        </div>}

        <div class="thinOrangeLine"/><br/><br/><br/>

        <div className='greenBar'>MY MISSION HISTORY</div>

        <div className='missionHistoryText'>Agent Papyrus, click <a style={{color:'#f9df39'}} href='./myhistory' target="_blank">here</a> to review your past missions. Most of this information won't help you with today's mission, but we understand you like to reminisce.</div>

        <div className='greenBar'>HR DATABASE</div>

        <div className="ovalPicWrapper">
          <img src={filesPic} className="ovalPic" alt="Files" />
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
          {["MDS", "MARBLE DANGER SIGNAL", "MD SIGNAL"].includes(submittedSearchTerm) && <SearchMDS />}
          {submittedSearchTerm === "MARBLE" && <SearchMarble />}
          {submittedSearchTerm === "OBELISK" && <SearchObelisk />}
          {["PAPYRUS", "PAPRYS", "PAPYRS"].includes(submittedSearchTerm) && <SearchPapyrus />}
          {submittedSearchTerm === "REAMER" && <SearchReamer />}
          {["OPERATION BC", "OPERATION BUBONIC CURTSY", "BUBONIC CURTSY", "BUBONIC CURTSEY", "BUBONIC CURTAY", "OPERATIONBC", "OPBC", "OP BC"].includes(submittedSearchTerm) && <SearchOPBC />}
          {submittedSearchTerm === "ROOKIE" && <SearchRookie />}
          {["SHALE", "SHAKE"].includes(submittedSearchTerm) && <SearchShale />}
          {!acceptableSearchTerms.includes(submittedSearchTerm) && <div><div class="orangeLine"/><div className='myprofile-header'>No Files Found for '{submittedSearchTerm}'</div></div>}
          

      </div>

      <LeslieFooter />

    </div>
  );
}

export default Myprofile;
