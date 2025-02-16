import { useState } from "react";

import useDeviceType from "./UseDeviceType.js";

function Questions() {
  const isMobile = useDeviceType();

  const [oneToggled, setOneToggled] = useState(false);
  const [twoToggled, setTwoToggled] = useState(false);
  const [threeToggled, setThreeToggled] = useState(false);
  const [fourToggled, setFourToggled] = useState(false);
  const [fiveToggled, setFiveToggled] = useState(false);
  const [sixToggled, setSixToggled] = useState(false);
  const [sevenToggled, setSevenToggled] = useState(false);
  const [eightToggled, setEightToggled] = useState(false);
  const [nineToggled, setNineToggled] = useState(false);
  const [tenToggled, setTenToggled] = useState(false);
  const [elevenToggled, setElevenToggled] = useState(false);
  const [twelveToggled, setTwelveToggled] = useState(false);

  const greenBarStyle = {
    color: "#F9DF39",
    height: isMobile ? "20vw" : "200px",
    fontSize: isMobile ? "10vw" : "60px",
  };

  // const dropdownStyle = {
  //   cursor: 'pointer',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: isMobile ? "" : "800px"

  // }

  return (
    <div>
      <div className="greenBar" style={greenBarStyle}>
        Questions?
      </div>

      <br />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setOneToggled(!oneToggled)}
      >
        <span>What exactly is this mission?</span>
        <span
          style={{
            transform: oneToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {oneToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            A spy is walking around Little Tokyo pretending to be shopping. You
            will receive texts, phone calls, and clues to discover what they are
            wearing and what they are doing. Your goal: correctly identify this
            undercover spy and decide their fate. There's jokes, a story,
            puzzles, and thrills!
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setTwoToggled(!twoToggled)}
      >
        <span>How long does it take?</span>
        <span
          style={{
            transform: twoToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {twoToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            The mission should take you from 60 to 90 minutes.
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setThreeToggled(!threeToggled)}
      >
        <span>How many people can play?</span>
        <span
          style={{
            transform: threeToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {threeToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            Up to two people can play together, but solo players are welcome.
            <br />
            <br />
            For groups larger than two, purchase tickets in the same time slots
            so the missions can start and end around the same time.
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setFourToggled(!fourToggled)}
      >
        <span>Can I play by myself?</span>
        <span
          style={{
            transform: fourToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {fourToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            Yes! Spies Among Us is a great way to kill an hour and explore the
            area!
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setFiveToggled(!fiveToggled)}
      >
        <span>Can kids play?</span>
        <span
          style={{
            transform: fiveToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {fiveToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            We recommend ages 12 and up to get the most out of the experience.
            Younger kids are welcome to participate and can help solve clues and
            search for the spy. A portion of the experience is navigating your
            phone so an adult is necessary to “drive” the experience.
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setSixToggled(!sixToggled)}
      >
        <span>Is this experience outside?</span>
        <span
          style={{
            transform: sixToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {sixToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            Yes. If bad weather forces us to cancel your mission, we will issue
            you a refund and you can hopefully join us another day.
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setSevenToggled(!sevenToggled)}
      >
        <span>Does this involve a lot of walking?</span>
        <span
          style={{
            transform: sevenToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {sevenToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            There will be between 1 and 1.5 miles of walking, but you are
            welcome to stop and rest as you like. All locations but one are
            wheelchair accessible, and we can direct you to a different location
            if needed.
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setEightToggled(!eightToggled)}
      >
        <span>Do I need to download an app to play?</span>
        <span
          style={{
            transform: eightToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {eightToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            No! All the exciting stuff happens over texting, calling, web
            browser, or in person.
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setNineToggled(!nineToggled)}
      >
        <span>
          How does it work if I have more than two people in my group?
        </span>
        <span
          style={{
            transform: nineToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {nineToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            The missions are designed for groups of two players so we recommend
            splitting up. We will start the first team five minutes before the
            second team so that both groups will have their own experience but
            can end around the same time.
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setTenToggled(!tenToggled)}
      >
        <span>What are your terms and conditions?</span>
        <span
          style={{
            transform: tenToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {tenToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            Located{" "}
            <a
              href="./terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgb(255,55,0)" }}
            >
              here
            </a>
            !
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setElevenToggled(!elevenToggled)}
      >
        <span>What data do you collect?</span>
        <span
          style={{
            transform: elevenToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {elevenToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            We collect your phone number and email to send clues to you for up
            to 24 hours. We may continue to send you marketing email updates
            with new shows that you can opt out of. We will never share or sell
            your data. Full privacy policy{" "}
            <a
              href="./privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgb(255,55,0)" }}
            >
              here
            </a>
            .
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />

      <div
        className={
          isMobile ? "myHistoryDropdownMobile" : "myHistoryDropdownDesktop"
        }
        onClick={() => setTwelveToggled(!twelveToggled)}
      >
        <span>I have a question not listed here!</span>
        <span
          style={{
            transform: twelveToggled ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▼
        </span>
      </div>
      {twelveToggled === true && (
        <div style={{ marginTop: "20px" }}>
          <div className={ isMobile ? "questionsDropdownTextMobile" : "questionsDropdownTextDesktop" }>
            Drop us an email at{" "}
            <a
              target="_top"
              style={{ color: "rgb(255,55,0)" }}
              href="mailto:contact@interactiveescapes.com"
              rel="noopener"
            >
              contact@interactiveescapes.com
            </a>
            .
          </div>
        </div>
      )}

      <div className="thinOrangeLine" style={{ width: isMobile ? "" : "800px" }} />
    </div>
  );
}

export default Questions;
