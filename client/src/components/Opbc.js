import { useState, useEffect } from 'react';
import papyrusheadshake3 from '../assets/pictures/Papyrusheadshake3.gif';
import opbcimage from '../assets/pictures/Operation Bubonic Curtsy 3.20.24.jpg'
import opbcvideo from '../assets/videos/Papyrus Leslie Phone Call Video 3.29.24.mp4'
import LeslieFooter from "./LeslieFooter.js";

function Opbc() {

  const [password, setPassword] = useState('');
  const [submittedPassword, setSubmittedPassword] = useState('');
  const [transcriptToggled, setTranscriptToggled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const valueCaps = password.toUpperCase();
    console.log("Submitted value:", valueCaps);
    setSubmittedPassword(valueCaps);

    if (validPasswords.includes(valueCaps)) {
      setIsAnimating(true);
      setPassword('Success!');
    }
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false); // End animation
        setPassword(''); // Clear input field after animation
      }, 1000); // Reset after 1 second
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const validPasswords = ['EGREGIOUS', 'EGREGOUS']


  return (
    <div>
      <div className='pageContent'>

        <title>Operation Bubonic Curtsy</title>

        <div className='orangeBar'>OPERATION BUBONIC CURTSY</div>

        {(!validPasswords.includes(submittedPassword) || submittedPassword === "" || isAnimating === true) && <div>

          <div className='opbc-subheader'>WARNING! Classified files. Enter password to continue.</div>

          <form onSubmit={handleSubmit} className="opbcPageForm">

            <input
              type="text" 
              name="password"
              className={`passwordFormField ${isAnimating ? 'animateInput' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="passwordButton">Enter</button>

          </form>

        </div>}

        {submittedPassword==="" && <div></div>}

        {(!validPasswords.includes(submittedPassword) && submittedPassword !== "") && 
          <div className='wrongPassword'>Wrong password.<br/>Entry denied!<br/>
            <img src={papyrusheadshake3} alt="Papyrus shaking his head" className="papyrusheadshake3"/>
          </div>
        }

        {(validPasswords.includes(submittedPassword) && isAnimating !== true) &&
          <div className='rightPassword'>
            <br/>
            <img src={opbcimage} alt="Secret Document" className="opbcimage"/>
            <br/><br/>
            <div className='orangeBar'>FALLOUT FROM OP BC</div>
            <br/>
            <div className='killOrder'>KILL ORDER PHONE CALL<br/>(five years ago)</div>
            <br/>
            <div className='describeCall'>Recording of official call between Special Agent PAPYRUS and LESLIE, Head of Human Resources</div>
            <br/>
            <div className="videoContainer">
              {/* <iframe className="video" src={opbcvideo} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> */}
              <video className="video" controls>
                <source src={opbcvideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <br/>
            <br/>
            <div className="orangeLine"/>
            <br/>
            <br/>
            <span 
              onClick={() => setTranscriptToggled(!transcriptToggled)} 
              style={{ cursor: 'pointer'}}>
              {transcriptToggled===true && <span>▼</span>}
              {transcriptToggled===false && <span style={{ display: 'inline-block', transform: 'rotate(-90deg)', marginBottom: '20vw' }}>▼</span>}
              Or click here to read the transcript
            </span>
            {transcriptToggled===true && 
              <div className="transcript">
                <div className="leslieDialog">LESLIE</div>
                <div className="dialog">Oh, hiya there Mr. P!</div>
                <div className="papyrusDialog">PAPYRUS</div>
                <div className="dialog">Ah. Leslie. Uhh. I need to place a <strong><u>kill order</u></strong> on <u><strong>Agents Marble and Shale.</strong></u></div>
                <div className="leslieDialog">LESLIE</div>
                <div className="dialog">Oh boy.</div>
                <div className="papyrusDialog">PAPYRUS</div>
                <div className="dialog">Yep.</div>
                <div className="leslieDialog">LESLIE</div>
                <div className="dialog">I see here we have on file a "best friends" form that you submitted... naming... both of them. Would you like me to remove them as your best friends?</div>
                <div className="papyrusDialog">PAPYRUS</div>
                <div className="dialog"><i>*Sighs*</i> Did either of them file a best friends form for me?</div>
                <div className="leslieDialog">LESLIE</div>
                <div className="dialog">Marble did. Shale filed... a different form.</div>
                <div className="papyrusDialog">PAPYRUS</div>
                <div className="dialog">Remove them both. Submit the kill order. <strong><u>They both refused a mission</u></strong>.</div>
                <div className="leslieDialog">LESLIE</div>
                <div className="dialog">Roger that. <strong><u>Operation BC</u></strong>. That was a tough one.</div>
                <div className="papyrusDialog">PAPYRUS</div>
                <div className="dialog">Yep.</div>
                <div className="leslieDialog">LESLIE</div>
                <div className="dialog">Do you and the kids have any Christmas plans?</div>
                <div className="papyrusDialog">PAPYRUS</div>
                <div className="dialog">Click.</div>
                <div className="leslieDialog">LESLIE</div>
                <div className="dialog">Hello? Hello? Did you hang up?</div>
                <div className="papyrusDialog">PAPYRUS</div>
                <div className="dialog">We're seeing the Adam Sandler movie Click at their mother's. It's their favorite movie.</div>
                <div className="leslieDialog">LESLIE</div>
                <div className="dialog">Ain't that a hoot! You have fun now.</div>
                <div className="papyrusDialog">PAPYRUS</div>
                <div className="dialog">Click.</div>
                <div className="leslieDialog" style={{ color: '#ffffff'}}>*END OF CALL*</div>
              </div>
            }
          </div>
        }

      </div>
      <LeslieFooter />
    </div>
  );
}

export default Opbc;
