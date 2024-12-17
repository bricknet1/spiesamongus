import Questions from "./Questions.js";

import SAUPic from '../assets/pictures/animatedSpiesLogo.gif';
import instagram from '../assets/pictures/instagram.webp';
import facebook from '../assets/pictures/facebook.webp';

function Confirmed() {

  return (
    <div className="pageContent" style={{paddingBottom:'10vw'}}>

      <title>Mission Confirmed | Spies Among Us</title>

      <div className='orangeBar'>MISSION: CONFIRMED</div>

      <div style={{alignContent: 'center', textAlign: 'center'}}>

        <br/>
        <br/>
        <br/>
        <div style={{fontSize: '8vw'}}>You will receive a text with instructions shortly.</div>
        <br/>
        <br/>
        <br/>

        <img src={SAUPic} alt="Spies Among Us" style={{ width: '85vw'}} />
        <br/>
        <br/>
        <br/>

      </div>

      <Questions/>

      <div style={{ fontSize: '5vw', textAlign: 'center', marginTop: '30vw'}}>
        <a href='https://www.instagram.com/spiesamong' target='_blank' rel="noreferrer"><img src={instagram} alt="Instagram" style={{ width: '10vw', marginBottom: '0', paddingBottom: '0'}}></img></a>
        <a href='https://www.facebook.com/spiesamong' target='_blank' rel="noreferrer"><img src={facebook} alt="Facebook" style={{ width: '10vw', marginBottom: '0', paddingBottom: '0'}}></img></a>
        <div style={{fontWeight: "normal"}}>2024 Interactive Escapes</div>
      </div>

    </div>
  )
}

export default Confirmed;