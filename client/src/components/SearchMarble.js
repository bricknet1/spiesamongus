import { useState } from 'react';


import marblePic from '../assets/pictures/Marble Polaroid.png';
import marbleAchievementPic from '../assets/pictures/Notable Achievement Marble 11.21.23.jpg';
import marbleSignalPic from '../assets/pictures/MDS 11.20.23.jpg';
import marblevideo from '../assets/videos/Papyrus Shale Phone Call Video 3.29.24.mp4'



function SearchMarble() {

  const [transcriptToggled, setTranscriptToggled] = useState(false);

  return (
    <div>
      <div className='greenBar'>AGENT MARBLE FILES</div>

      <div className='searchHeading'>Profile Photo missing</div>

      <img src={marblePic} className="polaroid" alt="Agent Marble" />

      <div style={{textAlign: 'center', fontSize: '6vw'}}>Prefers to wear <strong>blue or black hats</strong>.<br /><br />Gender unknown.<br /><br /></div>

      <div class="orangeLine"/>

      <div className='searchHeading'>Agent Marble Notable Achievement</div>

      <img src={marbleAchievementPic} className="otherSearchImage" alt="Achievement Document" />

      <img src={marbleSignalPic} className="otherSearchImage" alt="Three agents using a 2-finger signal" />

      <div class="orangeLine"/>

      <div className='searchHeading'>Phone Call</div>

      <div className='searchBody' style={{textAlign: 'center'}}>
        Discussing Agent Marble<br/>(five years ago)
      </div>

      <div className='transcriptButton'>
        <div className="videoContainer">
          {/* <iframe className="video" src={opbcvideo} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> */}
          <video className="video" controls>
            <source src={marblevideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <br/>
        <br/>
        <span 
          onClick={() => setTranscriptToggled(!transcriptToggled)} 
          style={{ cursor: 'pointer'}}>
          {transcriptToggled===true && <span>▼</span>}
          {transcriptToggled===false && <span style={{ display: 'inline-block', transform: 'rotate(-90deg)', 'margin-bottom': '20vw' }}>▼</span>}
          Or click here to read the transcript
        </span>
        {transcriptToggled===true && 
          <div className="transcript">
            <br/>
            <div className="dialog" style={{ fontStyle: 'italic'}}>Transcript of call between Agent PAPYRUS and former agent/traitor SHALE.</div>
            <div className="leslieDialog">PAPYRUS:</div>
            <div className="dialog">Shale?? You have a lot of guts calling me right now! You refused a mission, you're on the run, and I'm currently tracking your phone call. I'll have your location in 30 seconds.</div>
            <div className="papyrusDialog">SHALE:</div>
            <div className="dialog">Rack off Papyrus. I'm calling you as a courtesy.  Stay away from me and stay away from Marble. We will never agree to execute <strong>Operation Bubonic Curtsy</strong>.</div>
            <div className="leslieDialog">PAPYRUS:</div>
            <div className="dialog">Anngh, wrong. Guess what, Koala-Breath. Marble signed that mission.</div>
            <div className="papyrusDialog">SHALE:</div>
            <div className="dialog">You're full of it.</div>
            <div className="leslieDialog">PAPYRUS:</div>
            <div className="dialog">Pull up the Op BC file.</div>
            <div className="papyrusDialog">SHALE:</div>
            <div className="dialog">I can't. I don't know the password.</div>
            <div className="leslieDialog">PAPYRUS:</div>
            <div className="dialog">Guess you'll have to trust me then: <strong>Marble, your former partner, agreed to do the most evil mission in agency history</strong>.</div>
            <div className="papyrusDialog">SHALE:</div>
            <div className="dialog">Crikey. I'll never forgive Marble.</div>
            <div className="leslieDialog">PAPYRUS:</div>
            <div className="dialog">And guess what? It's been 30 seconds. You're toast.</div>
            <div className="papyrusDialog">SHALE:</div>
            <div className="dialog">Bugger.</div>
            <div className="leslieDialog">PAPYRUS:</div>
            <div className="dialog">Leslie, you trace the call? Where's she located?</div>
            <div className="shaleDialog">LESLIE:</div>
            <div className="dialog">Yes, she's... oh my god she's in your office bathroom!</div>
            <div className="leslieDialog">PAPYRUS:</div>
            <div className="dialog">What??? Wait. Did you trace her number or my number?</div>
            <div className="shaleDialog">LESLIE:</div>
            <div className="dialog">Hold on a sec. Are you calling me from your bathroom?</div>
            <div className="leslieDialog">PAPYRUS:</div>
            <div className="dialog">No, goodbye.</div>
            <div className="leslieDialog" style={{ color: '#ffffff'}}>*END OF CALL*</div>
          </div>
        }
      </div>

    </div>
  )
}

export default SearchMarble;