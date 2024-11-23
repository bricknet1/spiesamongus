import pathPic from '../assets/pictures/Marble Polaroid.png';

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

        <div className='orangeBar'>YOUR UPDATED MISSION</div>
        <br/>
        <br/>

        <div className='mission-subsubheader'>

          <span className='mission-emphasis'>1. TRACK DOWN AGENT MARBLE.</span> If found, do not engage.

          <img src={pathPic} className="mission-polaroid" alt="Agent Marble" />

          <span className='mission-emphasis'>2. STAY UNDERCOVER and STICK TOGETHER.</span> This area is a hive of spies and you do not want to draw attention to yourself or your targets. Act like you are normal shoppers at all times.<br/>

          

          <span className='mission-emphasis'>3. AVOID THESE WORDS:</span> Texting the words STOP or UNSUBSCRIBE will abruptly end your mission.<br/>
          <br/>

          <div className="orangeLine"/><br/>
          <br/>

          <span className='mission-emphasis'><u>4. DOWNLOAD THIS CONTACT FILE TO YOUR PHONE</u> and follow your phone's instructions to import them into your contacts. Failure to do this will make your mission VERY confusing.</span>



          <span className='mission-emphasis'>5. USE YOUR OWN PHONE.</span> Each agent should read texts and go to websites on their own phone. Share any information you discover! Only your partner can respond to texts, but you will need to use your phone to click on sites, fill out information, and answer phone calls as they come in!<br/>
          <br/>

          <div className="orangeLine"/><br/>
          <br/>

          <span className='mission-emphasis'>6. TO BEGIN,</span> cross the street and walk to the <span className='mission-emphasis'>RED BELL TOWER</span>.

          
          <span className='mission-emphasis'>7. Once you are there, tell your partner to text <span style={{ color: '#f9DF39'}}>READY FOR DANGER</span> to Agent Papyrus.</span>
        </div>





      </div>
      <LeslieFooter />
    </div>
  );
}

export default YourUpdatedMission;
