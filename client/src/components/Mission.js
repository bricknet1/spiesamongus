import marblePic from "../assets/pictures/Marble Polaroid.png";
import mallPic from "../assets/pictures/Undercover shoppers.jpg";
import phonePic from "../assets/pictures/Phone ringing no bg.png";
import pathPic from "../assets/pictures/Bell-Tower-Directions.gif";

import VCF from "../assets/Agent Papyrus Contact.vcf";

import LeslieFooter from "./LeslieFooter.js";
import VisitedPagesMenu from "./VisitedPagesMenu.js";

function Mission() {
  return (
    <div>
      <div className="pageContent">
        <title>Your Mission</title>
        <VisitedPagesMenu />

        <div className="orangeBar">OPERATION FILTHY LAUNDRY</div>

        <div className="mission-header">Hello Agent Rookie.</div>
        <div className="mission-subheader">
          <span className="mission-emphasis">FIVE YEARS AGO,</span>
        </div>
        <br />
        <div className="mission-subheader">a brilliant up-and-coming Agent</div>
        <br />
        <div className="mission-subheader">(not unlike youself)</div>
        <br />
        <div className="mission-subheader">
          chose to <span className="mission-emphasis">BETRAY</span> the Agency.
        </div>
        <br />
        <br />
        <div className="mission-subheader">That person's name?</div>
        <br />
        <div className="mission-subheader">
          <span className="mission-emphasis">AGENT MARBLE</span>
        </div>
        <br />
        <div className="mission-subheader">
          They are now a rogue spy trying to hold a secret meeting nearby.
        </div>
        <br />
        <br />
        <div className="mission-subheader">You're here to stop them.</div>
        <br />
        <br />
        <div className="mission-subheader">
          You have <span className="mission-emphasis">90 minutes</span> to
          complete your mission.
        </div>
        <br />
        <br />
        <br />

        <div className="orangeBar">MISSION DETAILS</div>
        <br />
        <br />

        <div className="mission-subsubheader">
          <span className="mission-emphasis">1. TRACK DOWN AGENT MARBLE.</span>{" "}
          If found, do not engage.
          <img
            src={marblePic}
            className="mission-polaroid"
            alt="Agent Marble"
          />
          <span className="mission-emphasis">2. STAY UNDERCOVER.</span> This
          area is a hive of spies and you do not want to draw attention to
          yourself or your targets. Act like you are a normal shopper at all
          times.
          <br />
          <div className="ovalPicWrapper">
            <img src={mallPic} className="ovalPic-mall" alt="Women in a mall" />
          </div>
          <br />
          <br />
          <span className="mission-emphasis">3. AVOID THESE WORDS:</span>{" "}
          Texting the words STOP or UNSUBSCRIBE will abruptly end your mission.
          <br />
          <br />
          <div className="orangeLine" />
          <br />
          <br />
          <span className="mission-emphasis">
            4.{" "}
            <u>
              <a
                href={VCF}
                target="_blank"
                rel="noreferrer"
                download="Agent Papyrus Contact.vcf"
                style={{ color: "white" }}
              >
                DOWNLOAD THIS CONTACT FILE TO YOUR PHONE
              </a>
            </u>{" "}
            and follow your phone's instructions to import them into your
            contacts. Failure to do this will make your mission VERY confusing.
          </span>
          <img src={phonePic} className="missionPhonePic" alt="Telephone" />
          <span className="mission-emphasis">5. TO BEGIN,</span> cross the
          street and walk to the{" "}
          <span className="mission-emphasis">RED BELL TOWER</span>.
          <div className="ovalPicWrapperVert">
            <img src={pathPic} className="ovalPicVert" alt="The path forward" />
          </div>
          <br />
          <br />
          <span className="mission-emphasis">
            6. Once you are there, text READY FOR DANGER to:
            <br />
            <br />
          </span>
          <div style={{ fontSize: "10vw", textAlign: "center" }}>
            <a
              target="_parent"
              href="sms:+18776641821"
              style={{ color: "#f9DF39" }}
            >
              <u>Agent Papyrus</u>
            </a>
          </div>
        </div>
      </div>
      <LeslieFooter unfixed={true} />
    </div>
  );
}

export default Mission;
