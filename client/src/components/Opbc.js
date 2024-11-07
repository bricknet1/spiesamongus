import { useState } from 'react';
import papyrusheadshake3 from '../assets/pictures/Papyrusheadshake3.gif';
import opbcimage from '../assets/pictures/Operation Bubonic Curtsy 3.20.24.jpg'

function Opbc() {

  const [password, setPassword] = useState('');
  const [submittedPassword, setSubmittedPassword] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted value:", password);
    setSubmittedPassword(password)
  }




  return (
    <div className='pageContent'>

      <title>Operation Bubonic Curtsy</title>

      <div className='orangeBar'>OPERATION BUBONIC CURTSY</div>

      {(submittedPassword !== "egregious" || submittedPassword === "") && <div>

        <div className='opbc-subheader'>WARNING! Classified files. Enter password to continue.</div>

        <form onSubmit={handleSubmit} className="opbcPageForm">

          <input
            type="text" 
            name="password"
            className="passwordFormField"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="passwordButton">Enter</button>

        </form>

      </div>}

      {submittedPassword==="" && <div></div>}

      {(submittedPassword !== "egregious" && submittedPassword !== "") && 
        <div className='wrongPassword'>Wrong password.<br/>Entry denied!<br/>
          <img src={papyrusheadshake3} alt="Papyrus shaking his head" className="papyrusheadshake3"/>
        </div>
      }

      {submittedPassword==="egregious" && 
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
            <iframe className="video" src="https://video.wixstatic.com/video/aa1885_21dd3df0aed746ce9cc32b5971c58e86/720p/mp4/file.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
          </div>
        </div>
      }


    </div>
  );
}

export default Opbc;
