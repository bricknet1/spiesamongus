import Questions from "./Questions.js";
import SocialFooter from "./SocialFooter.js";

import SAUPic from "../assets/pictures/animatedSpiesLogo.gif";

function PrivateConfirmed() {
  return (
    <div className="pageContent" style={{ paddingBottom: "10vw" }}>
      <title>Submission Confirmed | Spies Among Us</title>

      <div className="orangeBar" id="top">SUBMISSION: CONFIRMED</div>

      <div style={{ alignContent: "center", textAlign: "center" }}>
        <br />
        <br />
        <br />
        <div style={{ fontSize: "8vw" }}>
        Submission received! We will be in touch soon. Please check your
        spam folder as emails often end up there!
        </div>
        <br />
        <br />
        <br />

        <img src={SAUPic} alt="Spies Among Us" style={{ width: "85vw" }} />
        <br />
        <br />
        <br />
      </div>

      <Questions />

      <SocialFooter />
    </div>
  );
}

export default PrivateConfirmed;
