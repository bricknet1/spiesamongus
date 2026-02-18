import { useState, useEffect } from "react";

import SocialFooter from "./SocialFooter.js";

import victoriaPic from "../assets/pictures/actors/Victoria Strange.png";
import victoriaPolaroid from "../assets/pictures/actors/Polaroid - Victoria Strange.png";
import jamesPic from "../assets/pictures/actors/James Jelin Headshot.jpg";
import jamesPolaroid from "../assets/pictures/actors/Polaroid - James Jelin.png";
import anniePic from "../assets/pictures/actors/Annie Donley Headshot.jpg";
import anniePolaroid from "../assets/pictures/actors/Annie Donley poloroid.png";
import dariaPic from "../assets/pictures/actors/Daria Good.jpg";
import dariaPolaroid from "../assets/pictures/actors/Daria Good poloroid.png";
import jeffPic from "../assets/pictures/actors/Jeff Murdoch Headshot.jpg";
import jeffPolaroid from "../assets/pictures/actors/Jeff Murdoch  polaroid.png";
import prescottPic from "../assets/pictures/actors/Prescott Gadd Headshot.jpg";
import prescottPolaroid from "../assets/pictures/actors/Prescott Gadd polaroid.png";
import alexPic from "../assets/pictures/actors/AlexFelderHeadshot.jfif";
import alexPolaroid from "../assets/pictures/actors/Alex Felder Polaroid.png";

function Debrief() {
  const [oneToggled, setOneToggled] = useState(false);
  const [twoToggled, setTwoToggled] = useState(false);
  const [threeToggled, setThreeToggled] = useState(false);
  const [fourToggled, setFourToggled] = useState(false);
  const [fiveToggled, setFiveToggled] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [settings, setSettings] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const handleImageClick = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  // Clear all localStorage when user visits debrief page
  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.activeActors)) {
          data.activeActors = [];
        }
        setSettings(data);
      });
  }, [API_URL]);

  useEffect(() => {
    if (modalVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll"); // Cleanup on unmount
  }, [modalVisible]);

  if (!settings) return <div>Loading...</div>;

  const recsObject = (name, url, blurb, order) => {
    return (
      <div className="debrief-recs-object">
        <a
          target="_blank"
          href={url}
          rel="noreferrer"
          className="debrief-link"
        >
          {name}
        </a>
        <br />
        <i>{blurb}</i>
        <br />
        <br />
        What to order?
        <br />
        <div className="debrief-order">-{order}-</div>
      </div>
    );
  };

  return (
    <div className="pageContent">
      <title>Debrief & Credits</title>
      <div className="orangeBar">REVIEW US</div>

      <div className="debrief-main-text">
      If you had a great time, it would be very helpful if you left us a
      review on{" "}
      <a
        href="https://www.tripadvisor.com/UserReviewEdit-g32655-d27950047-Spies_Among_Us_An_Immersive_Adventure-Los_Angeles_California.html"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#f9DF39" }}
      >
        Tripadvisor
      </a>{" "}
      or{" "}
      <a
        href="https://g.page/r/CVzTMbhGamnjEAI/review"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#f9DF39" }}
      >
        Google
      </a>
      !<br />
      <br />
      If you did not have a great time, have feedback, or have an idea on how
      to improve the mission, please tell us here. Please tell us about your
      experience{" "}
      <a
        href="https://forms.gle/46bRLZ4QmdgKmGYW6"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#f9DF39" }}
      >
        here
      </a>
      .
      </div>

      <div className="orangeBar">LOCAL RECS</div>

      <div className="debrief-main-text">
        Little Tokyo is full of great spots to check out. You probably
        discovered a few on your mission, but here are some of our favorite
        places in the area!
      </div>

      <div
        className="debriefDropdown"
        onClick={() => setOneToggled(!oneToggled)}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Drinks N/A</span>
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
          {recsObject("TEA MASTER MATCHA CAFE", "https://maps.app.goo.gl/Vn7jLVC814Gy7ats7", "They take matcha VERY seriously", "Matcha Latte")}
          {recsObject("HONEYMEE", "https://maps.app.goo.gl/qk9u16CU19ATEYYV6", "Lots of delicious drinks and ice creams", "Honeycomb Ice Cream")}
        </div>
      )}

      <div className="thinOrangeLine" />

      <div
        className="debriefDropdown"
        onClick={() => setTwoToggled(!twoToggled)}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Quick Bites</span>
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
          {recsObject("BANDIT CHOW MEIN", "https://maps.app.goo.gl/b6rM8sWXJFDSCdD88", "You walked by this food truck a few times today. It is delicious!", "Red Oil Chicken Chow Mein")}
          {recsObject("BUNGRAZE", "https://maps.app.goo.gl/uvb3fGM854rRdU2k9", "They have fresh focaccia dough that they throw into the oven only after you order. Makes for an incredible burger bun!", "Super Smash Burger")}
          {recsObject("NIJIYA MARKET", "https://maps.app.goo.gl/sf2aSv89ck3TNfUx7", "This is the very market you first discovered with the golden statues on the roof! They have everything you could want from a Japanese market.", "Salmon Onigiri")}
        </div>
      )}

      <div className="thinOrangeLine" />

      <div
        className="debriefDropdown"
        onClick={() => setThreeToggled(!threeToggled)}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Drinks (Alcoholic)</span>
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
          {recsObject("THE MERMAID", "https://maps.app.goo.gl/NMrXQfNq6XY7Kbzq7", "Tiki dive bar with refreshing drinks!", "Smokey Eye")}
          {recsObject("WOLF AND CRANE", "https://maps.app.goo.gl/MBAcx7Ki7EVEdE3T6", "Probably the closest rec to you if you just finished the mission. Huge selection of Japanese whiskies and tasty cocktails.", "Beets by Wolf")}
        </div>
      )}

      <div className="thinOrangeLine" />

      <div
        className="debriefDropdown"
        onClick={() => setFourToggled(!fourToggled)}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Tasty Treats</span>
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
          {recsObject("LITTLE TOKYO TAIYAKI", "https://maps.app.goo.gl/T88avFqGYWxqJf7Q8", "Specializing in Taiyaki: freshly grilled dough in the shape of a fish. Pick a filling that sounds good to you.", "Chocolate Taiyaki")}
          {recsObject("TEA MASTER MATCHA CAFE", "https://maps.app.goo.gl/Vn7jLVC814Gy7ats7", "They take matcha VERY seriously and their soft serve is the creamiest.", "Matcha Soft Serve")}
          {recsObject("HONEYMEE", "https://maps.app.goo.gl/qk9u16CU19ATEYYV6", "Lots of delicious drinks and ice creams", "Honeycomb Ice Cream")}
        </div>
      )}

      <div className="thinOrangeLine" />

      <div
        className="debriefDropdown"
        onClick={() => setFiveToggled(!fiveToggled)}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Sit Down Meals</span>
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
          {recsObject("IZAKAYA GAZEN", "https://maps.app.goo.gl/y2ArQaL7bTpSu3Vv7", "Huge menu, great sake list. Everything from sushi to shabu shabu to noodles.", "Signature Tofu Sampler")}
          {recsObject("SHIN-SEN-GUMI HAKATA RAMEN", "https://maps.app.goo.gl/wHAwj2jXGbWjSH7P6", "Great ramen with lots of topping options", "Spicy Hakata Dandan Men Ramen")}
          {recsObject("BADMAASH", "https://maps.app.goo.gl/hcLXCQqZzFNmWeNV9", "Classic Indian menu spruced up with inventive fusion items", "Goan Pork Curry")}
          {recsObject("RAKKAN RAMEN", "https://maps.app.goo.gl/S2jq33aQDnA8NxZy7", "Offers yummy Vegetarian & Vegan Ramen", "Garnet Ramen")}
        </div>
      )}

      <div className="thinOrangeLine" />

      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="orangeBar">CREDITS</div>

      {/* Helper function to get actors by role */}
      {(() => {
        const actorPolaroids = {
          Victoria: victoriaPolaroid,
          James: jamesPolaroid,
          Annie: anniePolaroid,
          Daria: dariaPolaroid,
          Jeff: jeffPolaroid,
          Alex: alexPolaroid,
          Prescott: prescottPolaroid,
        };

        const getActorsByRole = (role) => {
          const actorRoles = settings?.actorRoles || {};
          return Object.keys(actorRoles).filter(
            (actor) => actorRoles[actor] === role
          );
        };

        const marbleActors = getActorsByRole("Marble");
        const handlerActors = getActorsByRole("Handler");

        const renderActorPolaroid = (actorName) => {
          const polaroid = actorPolaroids[actorName];
          if (!polaroid) return null;

          return (
            <img
              key={actorName}
              src={polaroid}
              className="debrief-polaroid"
              alt={actorName}
              onClick={() => handleImageClick(actorName)}
              style={{ cursor: "pointer" }}
            />
          );
        };

        return (
          <>
            {marbleActors.length > 0 && (
              <>
                <div className="debrief-main-text">
                  AGENT MARBLE
                  <br />
                  (tap image to reveal)
                </div>
                {marbleActors.map((actor) => renderActorPolaroid(actor))}
              </>
            )}

            {handlerActors.length > 0 && (
              <>
                <div
                  className="debrief-main-text"
                  style={{ marginTop: marbleActors.length > 0 ? "20px" : "0" }}
                >
                  HANDLER
                  <br />
                  (tap image to reveal)
                </div>
                {handlerActors.map((actor) => renderActorPolaroid(actor))}
              </>
            )}
          </>
        );
      })()}

      {modalVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            overflow: "auto",
          }}
        >
          <div
            style={{
              background: "#21174C",
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "1vw",
                right: "1vw",
                background: "transparent",
                border: "none",
                fontSize: "15vw",
                cursor: "pointer",
                color: "white",
              }}
            >
              &times;
            </button>
            {modalContent === "Victoria" && (
              <div>
              <img
                src={victoriaPic}
                className="debrief-headshot"
                alt="Victoria Strange"
              />
              <div className="debrief-bio">
                Victoria Strange is an actor, director, & model best known for
                her portrayals of scream queens throughout the indie horror
                world (
                <i>
                  Las Vegas Frankenstein, Murder Van, Slaughter on the Set
                </i>
                ) as femme fatales across the burgeoning vertical drama-verse
                (
                <i>
                  Sleeping Handsome, Entrapping The Heart of a Billionaire
                </i>
                ) and her work within American Immersion Theater's LA company.
                When not performing across stage & screen (or the streets of
                Little Tokyo!) she can be found suspended on aerial silks, or
                tucked inside a personal fortress of books alongside her cats.
                Reach out via Instagram @victoriavstrange to chat about
                overlooked film soundtracks, climate justice, or your next
                great performance idea.
              </div>
              </div>
            )}

            {modalContent === "James" && (
              <div>
              <img
                src={jamesPic}
                className="debrief-headshot"
                alt="James Jelin"
              />
              <div className="debrief-bio">
                James Jelin is a Hollywood-based improviser, actor, comedian,
                and drag queen. He performs at UCB with House team Local
                Tycoon and co-hosts UCB's Drag Lip Sync Competition. His
                training also includes Groundlings, Doug Warhit's Scene Study,
                The Commercial Class, Character Study with SNL's John
                Milhiser, and a degree in Theater from Bowdoin College. You
                can catch him in USATV's upcoming series Second Chances. On
                the side, James runs social media and fundraising programs for
                progressive political campaigns.
              </div>
              </div>
            )}

            {modalContent === "Annie" && (
              <div>
              <img
                src={anniePic}
                className="debrief-headshot"
                alt="Annie Donley"
              />
              <div className="debrief-bio">
                Annie Donley is a comedian, actor, writer, and co-host of the
                non-famous podcast Mom Stomp. She starred in season 3 of JOE
                PERA TALKS W/ YOU as 'Diane Luten' and was a digital creator
                at COMEDY CENTRAL prior to that. Annie served as founding
                member, instructor, and Programming Director of The Brooklyn
                Comedy Collective. She co-wrote the unairable pilot
                truthhunters.com w/ Conner O'Malley.
              </div>
              </div>
            )}

            {modalContent === "Jeff" && (
              <div>
              <img
                src={jeffPic}
                className="debrief-headshot"
                alt="Jeff Murdoch"
              />
              <div className="debrief-bio">
                Born in Detroit, trained in Chicago Jeff Murdoch is now an
                actor / comedian / writer living in LA. He has worked on such
                shows as The Bear, Shameless, and Utopia and is an alumni of
                the world famous Second City Mainstage in Chicago as well as
                the Just For Laughs festival in Montreal. A comedian at heart
                Jeff can be seen around LA working on shows and mics in front
                of audiences regularly and on his weekly podcast Mystery
                County Monster Hunters Club.
              </div>
              </div>
            )}

            {modalContent === "Daria" && (
              <div>
              <img
                src={dariaPic}
                className="debrief-headshot"
                alt="Daria Good"
              />
              <div className="debrief-bio">
                Daria Good graduated from The American Academy of Dramatic
                Arts (AADA) after attending the Orange County School of the
                Arts' acting program in high school. Her recent credits
                include: The development and regional premier of Women of
                Zalongo, the new musical Cherries Rare and Fair in the
                Hollywood Fringe, and Foolish co's Muse of Fire and School for
                Scandal. Good is currently wrapping up production as an actor
                and producer on the short film The Taxidermy Woman.
                @daria.is.good
              </div>
              </div>
            )}

            {modalContent === "Alex" && (
              <div>
              <img
                src={alexPic}
                className="debrief-headshot"
                alt="Alex Felder"
              />
              <div className="debrief-bio">
                Alex Felder is an LA-based actor/comedian who you may have
                seen in a national "Safelite" ad campaign! (So like,
                technically he was in the Olympics, mom...)
                <br />
                <br />
                In addition to his film appearances, he does sketch and improv
                with his teams "Corduroy" and "Blood Pact" at the Pack
                Theater, and regularly performs at the Lyric Hyperion theater
                in the episodic improv show "Writer's Block." You can find him
                posting regularly on his instagram @aka_felder. He also has
                other hobbies, which in the grand scheme of the universe don't
                really matter. None of this matters. You are a speck of dust.{" "}
                <br />
                <br />
                Enjoy the show!!
              </div>
              </div>
            )}

            {modalContent === "Prescott" && (
              <div>
              <img
                src={prescottPic}
                className="debrief-headshot"
                alt="Prescott Gadd"
              />
              <div className="debrief-bio">
                Prescott Gadd created Spies Among Us! He used to perform
                sketch and improv comedy in Chicago so every now and then he
                likes to perform as Agent Marble (NOT because an actor had to
                cancel last minute). Prescott creates immersive experiences in
                the LA area that are always interactive and sometimes funny.
                You can see his past and current projects{" "}
                <a
                  href="https://interactiveescapes.com/portfolio"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white" }}
                >
                  here
                </a>
                .
              </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="orangeLine" />
      <br />
      <br />
      <br />
      <div className="debrief-titles">Agent Shale Voice Work</div>
      <div className="debrief-names">
        <a
          href="https://www.thetarotnerd.com/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          Tosca Minotto
        </a>
      </div>
      <br />
      <br />
      <div className="debrief-titles">Agent Shale Model</div>
      <div className="debrief-names">Kitty Medina</div>
      <br />
      <br />
      <div className="debrief-titles">Agent Leslie Voice Work</div>
      <div className="debrief-names">
        <a
          href="https://www.instagram.com/momstomppodcast/?hl=en"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          Jo Scott
        </a>
      </div>
      <br />
      <br />
      <div className="debrief-titles">Agent Papyrus Voice Work</div>
      <div className="debrief-names">Prescott Gadd</div>
      <br />
      <br />
      <div className="debrief-titles">Agent Papyrus Model</div>
      <div className="debrief-names">Peter Scott</div>
      <br />
      <br />
      <br />
      <div className="orangeLine" />
      <br />
      <br />
      <br />
      <div className="debrief-titles">Created by</div>
      <div className="debrief-names">Prescott Gadd</div>
      <br />
      <br />
      <div className="debrief-titles">Operations by</div>
      <div className="debrief-names">Jen Staben</div>
      <br />
      <br />
      <div className="debrief-titles">Art and Design by</div>
      <div className="debrief-names">
        <a
          href="https://ccalleo.com/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          Curtiss Calleo
        </a>
      </div>
      <br />
      <br />
      <div className="debrief-titles">Senior Developer</div>
      <div className="debrief-names">
        <a
          href="https://www.linkedin.com/in/nickjohnson-losangeles/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          Nick Johnson
        </a>
      </div>
      <br />
      <br />
      <div className="debrief-titles">Special thanks to</div>
      <div className="debrief-names">
        <a
          href="https://williamoconnell.me/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          William O'Connell / Subtext Game
        </a>
      </div>
      <div className="debrief-titles">for tech advice</div>
      <br />
      <br />
      <br />

      <div className="orangeLine" />

      <div className="debrief-names">
        <br />
        Thank you to our playtesters...
        <br />
        <br />
        John Anderson
        <br />
        Molly Anderson
        <br />
        Benjamin Berk
        <br />
        Brian Biancardi
        <br />
        Serena Bright
        <br />
        Becky Cumberland
        <br />
        Marlee Delia
        <br />
        Annie Donley
        <br />
        Rachel Donley
        <br />
        Valerie Gansel
        <br />
        Alex Haney
        <br />
        Tim Heurlin
        <br />
        Tommy Honton
        <br />
        Kevin Horst
        <br />
        Jared Jeffries
        <br />
        James Jelin
        <br />
        Tim Lamphier
        <br />
        Phil Meister
        <br />
        Geremy Mumenthaler
        <br />
        Jeff Murdoch
        <br />
        Anne Nemer
        <br />
        Jordan Nomura
        <br />
        Erin Rein
        <br />
        James Ross
        <br />
        Kate Ross
        <br />
        Louis Ross
        <br />
        Tyler Samples
        <br />
        Harold Scissors
        <br />
        Christine Shedd-Thompson
        <br />
        Jen Staben
        <br />
        Victoria Strange
        <br />
        Meaghan Strickland
        <br />
        Nina Zhao
      </div>

      <SocialFooter />
    </div>
  );
}

export default Debrief;
