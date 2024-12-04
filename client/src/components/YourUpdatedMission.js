import mapPic from '../assets/pictures/MarblePath5.7.24.gif';

import LeslieFooter from "./LeslieFooter.js";

function YourUpdatedMission() {

  return (
    <div>
      <div className='pageContent'>

        <title>Your Mission</title>

        <div className='orangeBar'>OPERATION FILTHY LAUNDRY</div>

        <div className='mission-header'>Urgent update,<br/>Agent Rookie!</div>

        <div className='mission-subsubheader'><span className='mission-emphasis'>WE ACTIVATED</span> the tracking chip Marble is unwittingly carrying. With this knowledge we have traced <span className='mission-emphasis'>the path Marble is continuously walking</span> in a loop.<br/>
        <br/>
        We recommend walking in the <span className='mission-emphasis'>opposite direction</span> of Marble, to increase your chances of finding them <span className='mission-emphasis'>OR</span> pick a <span className='mission-emphasis'>secluded spot</span> to stake out and wait for Marble to approach.</div><br/>

        <div className="updatedMission-map-wrapper">
          <img src={mapPic} className="updatedMission-map" alt="Agent Marble" />
        </div>

        <div className='orangeBar'>YOUR UPDATED MISSION</div>
        <br/>
        <br/>

        <div className='mission-subsubheader'>

          <span className='mission-emphasis'>1. STAY UNDERCOVER.</span> Do not draw attention to yourself or your target. Act like you are a normal shopper at all times.<br/>
          <br/>

          <br/>
          <div className="orangeLine"/><br/>
          <br/>

          <span className='mission-emphasis'>2. TRACK DOWN AGENT MARBLE.</span> If found:<br/>

          <div style={{ textAlign: 'center'}} >Say:</div>

          <span className='mission-emphasis' style={{ color: '#F9DF39'}}><i>"Sorry, do you know how to get to Pershing Square?"</i></span><br/>
          <br/>

          <div style={{ textAlign: 'center'}} >Marble will respond:</div>

          <span className='mission-emphasis' style={{ color: '#FF3700'}}><i>"Oh, you don't need to go. I got you this."</i></span><br/>
          <br/>

          If they do not respond with these words, IT IS NOT MARBLE. Walk away and keep looking.<br/>
          <br/>

          <br/>
          <div className="orangeLine"/><br/>
          <br/>

          <span className='mission-emphasis'>3. MARBLE WILL GIVE YOU SOMETHING.</span><br/>
          <br/>

          <br/>
          <div className="orangeLine"/><br/>
          <br/>

          <span className='mission-emphasis'>4. SAY THANKS AND WALK AWAY.</span> Do not follow as that will spook Marble.<br/>
          <br/>

          <br/>
          <div className="orangeLine"/><br/>
          <br/>
          
          <span className='mission-emphasis'>5. TEXT AGENT PAPYRUS A DESCRIPTION OF WHAT MARBLE GAVE YOU.</span><br/>
          <br/>

        </div>





      </div>
      <LeslieFooter />
    </div>
  );
}

export default YourUpdatedMission;
