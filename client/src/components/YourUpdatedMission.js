import mapPic from "../assets/pictures/MarblePath3.12.25.gif";
import seattleMapPic from "../assets/pictures/MarblePath 4.28.26.gif";
import leftArrow from "../assets/pictures/Left Arrow cropped.png";

import LeslieFooter from "./LeslieFooter.js";
import VisitedPagesMenu from "./VisitedPagesMenu.js";

import { useSubdomain } from "./SubdomainProvider.js";

function YourUpdatedMission() {
  const subdomain = useSubdomain();
  return (
    <div>
      <div className="pageContent">
        <title>Your Updated Mission</title>
        <VisitedPagesMenu />

        <div className="orangeBar">OPERATION FILTHY LAUNDRY</div>

        <div className="mission-header">
          Urgent update,
          <br />
          Agent Rookie!
        </div>

        <div className="mission-subsubheader">
          <span className="mission-emphasis">WE ACTIVATED</span> the tracking
          chip Marble is unwittingly carrying. With this knowledge we have
          traced{" "}
          {subdomain === "seattle" ? (
            <>
              <span className="mission-emphasis">the path Marble is continuously walking{" "}</span> in 
              <span className="mission-emphasis" style={{ color: "#FF3700" }}>{" "}RED.</span>
              <br />
              <br />
              We recommend:
              <br />
              Pick a <span className="mission-emphasis">spot</span> to stake out on Pike Place and wait for Marble to approach. Avoid areas with big crowds to make it easier!
            </>
          ) : (
            <>
              the path Marble is continuously{" "}
              <span className="mission-emphasis">
                <span style={{ color: "#FF3700" }}>walking in a loop in RED.</span>
              </span>
              <br />
              <br />
              We recommend:
              <br />
              1. Take a left <img src={leftArrow} alt="left arrow" /> out of Hashimoto Plaza and walk
              in the opposite direction of Marble, to increase your chances of
              finding them.
              <br />
              <span className="mission-emphasis">OR</span>
              <br />
              2. Pick a <span className="mission-emphasis">secluded spot</span> to
              stake out and wait for Marble to approach. Avoid areas with big crowds
              to make it easier!
            </>
          )}
        </div>
        <br />

        <div className={subdomain === "seattle" ? "updatedMission-map-wrapper-seattle" : "updatedMission-map-wrapper"}>
          <img src={subdomain === "seattle" ? seattleMapPic : mapPic} className={subdomain === "seattle" ? "updatedMission-map-seattle" : "updatedMission-map"} alt="Agent Marble" />
        </div>

        <div className="orangeBar">YOUR UPDATED MISSION</div>
        <br />
        <br />

        <div className="mission-subsubheader">
          <span className="mission-emphasis">1. STAY UNDERCOVER.</span> Do not
          draw attention to yourself or your target. Act like you are a normal
          shopper at all times.
          <br />
          <br />
          <br />
          <div className="orangeLine" />
          <br />
          <br />
          <span className="mission-emphasis">
            2. TRACK DOWN AGENT MARBLE.
          </span>{" "}
          If found:
          <br />
          <div style={{ textAlign: "center" }}>Say:</div>
          <span className="mission-emphasis" style={{ color: "#F9DF39" }}>
            <i>"Sorry, do you know how to get {subdomain === "seattle" ? "to the Space Needle" : "to Pershing Square"}?"</i>
          </span>
          <br />
          <br />
          <div style={{ textAlign: "center" }}>Marble will respond:</div>
          <span className="mission-emphasis" style={{ color: "#FF3700" }}>
            <i>"Oh, you don't need to go. I got you this."</i>
          </span>
          <br />
          <br />
          If they do not respond with these words, IT IS NOT MARBLE. Walk away
          and keep looking.
          <br />
          <br />
          <br />
          <div className="orangeLine" />
          <br />
          <br />
          <span className="mission-emphasis">
            3. MARBLE WILL GIVE YOU SOMETHING.
          </span>
          <br />
          <br />
          <br />
          <div className="orangeLine" />
          <br />
          <br />
          <span className="mission-emphasis">
            4. SAY THANKS AND WALK AWAY.
          </span>{" "}
          Do not follow as that will spook Marble.
          <br />
          <br />
          <br />
          <div className="orangeLine" />
          <br />
          <br />
          <span className="mission-emphasis">
            5. TEXT AGENT PAPYRUS A DESCRIPTION OF WHAT MARBLE GAVE YOU.
          </span>
          <br />
          <br />
        </div>
      </div>
      <LeslieFooter unfixed={true} />
    </div>
  );
}

export default YourUpdatedMission;
