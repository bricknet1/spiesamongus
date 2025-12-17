import { useEffect } from "react";
import Questions from "./Questions.js";
import SocialFooter from "./SocialFooter.js";

import SAUPic from "../assets/pictures/animatedSpiesLogo.gif";

function Confirmed() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pageContent" style={{ paddingBottom: "10vw" }} id="top">
      <title>Mission Confirmed | Spies Among Us</title>

      <div className="orangeBar">MISSION: CONFIRMED</div>

      <div style={{ alignContent: "center", textAlign: "center" }}>
        <br />
        <br />
        <br />
        <div style={{ fontSize: "8vw" }}>
          You will receive a text with instructions shortly.
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

export default Confirmed;
