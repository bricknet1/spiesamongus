import papyrusheadshake3 from '../assets/pictures/Papyrusheadshake3.gif';
import opbcimage from '../assets/pictures/Operation Bubonic Curtsy 3.20.24.jpg'
import opbcvideo from '../assets/videos/Papyrus Leslie Phone Call Video 3.29.24.mp4'
import LeslieFooter from "./LeslieFooter.js";

function TheMission() {

  return (
    <div>
      <div className='pageContent'>

        <title>Your Mission</title>

        <div className='orangeBar'>OPERATION FILTHY LAUNDRY</div>

        <div className='mission-header'>Hello Agent Rookie.</div>
        <div className='mission-subheader'>
          FIVE YEARS AGO,<br/>
          <span className='mission-subsubheader'>
            a brilliant up-and-coming Agent<br/>
            (not unlike youself)<br/>
            chose to <span className='mission-emphasis'>BETRAY</span> the Agency.<br/>
            <br/>
            That person's name?<br/>
          </span>
          AGENT MARBLE<br/>
          <span className='mission-subsubheader'>
            They are now a rogue spy trying to hold a secret meeting nearby.<br/>
            <br/>
            You're here to stop them.<br/>
            <br/>
            You have <span className='mission-emphasis'>90 minutes</span> to complete your mission.<br/>
            <br/>
          </span>




        </div>
        <div className='mission-subsubheader'>
          <span className='mission-emphasis'>A ROGUE SPY</span> is currently roaming the area. Use your phone and wits to uncover clues, reveal their plot, and deduce their whereabouts. Adventure and danger will be hiding from you in plain sight!
        </div>
      <div className='orangeBar'>MISSION DETAILS</div>


      </div>
      <LeslieFooter />
    </div>
  );
}

export default TheMission;
