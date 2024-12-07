import victoriaPic from '../assets/pictures/Victoria Strange.png';
import jamesPic from '../assets/pictures/James Jelin Headshot.jpg';
import victoriaPolaroid from '../assets/pictures/Polaroid - Victoria Strange.png';
import jamesPolaroid from '../assets/pictures/Polaroid - James Jelin.png';
import instagram from '../assets/pictures/instagram.webp';
import facebook from '../assets/pictures/facebook.webp';

import { useState, useEffect } from 'react';


function Debrief() {

  const [oneToggled, setOneToggled] = useState(false);
  const [twoToggled, setTwoToggled] = useState(false);
  const [threeToggled, setThreeToggled] = useState(false);
  const [fourToggled, setFourToggled] = useState(false);
  const [fiveToggled, setFiveToggled] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleImageClick = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  useEffect(() => {
    if (modalVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll'); // Cleanup on unmount
  }, [modalVisible]);


  return (
    <div className="pageContent">

      <div className='orangeBar'>MISSION DEBRIEF</div>

      <div className="debrief-main-text">
        Thank you for playing!<br/>
        <br/>
        We are still tweaking this new show so we appreciate all feedback as we improve it.<br/>
        <br/>
        Please tell us about your experience <a href="https://forms.gle/46bRLZ4QmdgKmGYW6" target="_blank" rel="noreferrer noopener" style={{color: '#f9DF39'}}>here</a>.
      </div>

      <div className='orangeBar'>LOCAL RECS</div>

      <div className="debrief-main-text">
        Little Tokyo is full of great spots to check out. You probably discovered a few on your mission, but here are some of our favorite places in the area!
      </div>

      <div 
        className='debriefDropdown' 
        onClick={() => setOneToggled(!oneToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Drinks N/A</span>
        <span style={{ 
          transform: oneToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {oneToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="debriefDropdownText" >
          <a target="_blank" href="https://maps.app.goo.gl/Qr8EMq6z15iatjpr8" rel="noopener" className="debrief-link">MIDORI MATCHA</a><br/>
          <i>They take matcha VERY seriously</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Matcha Latte</blockquote>
          <br/>
          <a target="_blank" href="https://maps.app.goo.gl/qk9u16CU19ATEYYV6" rel="noopener" className="debrief-link">HONEYMEE</a><br/>
          <i>Lots of delicious drinks and ice creams</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Brown Sugar Boba</blockquote>
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='debriefDropdown' 
        onClick={() => setTwoToggled(!twoToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Quick Bites</span>
        <span style={{ 
          transform: twoToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {twoToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="debriefDropdownText" >
          <a target="_blank" href="https://maps.app.goo.gl/b6rM8sWXJFDSCdD88" rel="noopener" className="debrief-link">BANDIT CHOW MEIN</a><br/>
          <i>You walked by this food truck a few times today. It is delicious!</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Red Oil Chicken Chow Mein</blockquote>
          <br/>
          <a target="_blank" href="https://maps.app.goo.gl/uvb3fGM854rRdU2k9" rel="noopener" className="debrief-link">BUNGRAZE</a><br/>
          <i>They have fresh focaccia dough that they throw into the oven  only after you order. Makes for an incredible burger bun!</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Super Smash Burger</blockquote>
          <br/>
          <a target="_blank" href="https://maps.app.goo.gl/sf2aSv89ck3TNfUx7" rel="noopener" className="debrief-link">NIJIYA MARKET</a><br/>
          <i>This is the very market you first discovered with the golden statues on the roof! They have everything you could want from a Japanese market.</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Salmon Onigiri</blockquote>
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='debriefDropdown' 
        onClick={() => setThreeToggled(!threeToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Drinks</span>
        <span style={{ 
          transform: threeToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {threeToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="debriefDropdownText" >
          <a target="_blank" href="https://maps.app.goo.gl/MBAcx7Ki7EVEdE3T6" rel="noopener" className="debrief-link">WOLF AND CRANE</a><br/>
          <i>Probably the closest rec to you if you just finished the mission. Huge selection of Japanese whiskies and tasty cocktails.</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Beets by Wolf</blockquote>
          <br/>
          <a target="_blank" href="https://maps.app.goo.gl/NMrXQfNq6XY7Kbzq7" rel="noopener" className="debrief-link">THE MERMAID</a><br/>
          <i>Tiki dive bar with refreshing drinks!</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Smokey Eye</blockquote>
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='debriefDropdown' 
        onClick={() => setFourToggled(!fourToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Taasty Treats</span>
        <span style={{ 
          transform: fourToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {fourToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="debriefDropdownText" >
          <a target="_blank" href="https://maps.app.goo.gl/oz9gK5bfa8Z5gzuWA" rel="noopener" className="debrief-link">SOMISOMI</a><br/>
          <i>Specializing in Taiyaki: freshly grilled dough in the shape of a fish. Pick a filling that sounds good to you.</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Nutella Taiyaki</blockquote>
          <br/>
          <a target="_blank" href="https://maps.app.goo.gl/CzX9pYJhDZ97y4156" rel="noopener" className="debrief-link">MIDORI MATCHA CAFE</a><br/>
          <i>They take matcha VERY seriously</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Matcha Swirl Soft Serve</blockquote>
          <br/>
          <a target="_blank" href="https://maps.app.goo.gl/qk9u16CU19ATEYYV6" rel="noopener" className="debrief-link">HONEYMEE</a><br/>
          <i>Lots of delicious drinks and ice creams</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Honeycomb Ice Cream</blockquote>
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <div 
        className='debriefDropdown' 
        onClick={() => setFiveToggled(!fiveToggled)} 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>Sit Down Meals</span>
        <span style={{ 
          transform: fiveToggled ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
          }}>
          ▼
        </span>
      </div>
      {fiveToggled===true && <div style={{ marginTop: '20px' }}>
        <div className="debriefDropdownText" >
          <a target="_blank" href="https://maps.app.goo.gl/y2ArQaL7bTpSu3Vv7" rel="noopener" className="debrief-link">IZAKAYA GAZEN</a><br/>
          <i>Huge menu, great sake list. Everything from sushi to shabu shabu to noodles.</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Signature Tofu Sampler</blockquote>
          <br/>
          <a target="_blank" href="https://maps.app.goo.gl/wHAwj2jXGbWjSH7P6" rel="noopener" className="debrief-link">SHIN-SEN-GUMI HAKATA RAMEN</a><br/>
          <i>Great ramen with lots of topping options</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Spicy Hakata Dandan Men Ramen</blockquote>
          <br/>
          <a target="_blank" href="https://maps.app.goo.gl/hcLXCQqZzFNmWeNV9" rel="noopener" className="debrief-link">BADMAASH</a><br/>
          <i>Classic Indian menu spruced up with inventive fusion items</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Goan Pork Curry</blockquote>
          <br/>
          <a target="_blank" href="https://maps.app.goo.gl/S2jq33aQDnA8NxZy7" rel="noopener" className="debrief-link">RAKKAN RAMEN</a><br/>
          <i>Offers yummy Vegetarian & Vegan Ramen</i><br/>
          <br/>
          What to order?
          <blockquote className="debrief-blockquote">Garnet Ramen</blockquote>
          
        </div>
      </div>}

      <div class="thinOrangeLine"/>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <div className='orangeBar'>CREDITS</div>

      <div className="debrief-main-text">

      AGENT MARBLE<br/>
      (tap image to reveal)</div>

      <img
        src={victoriaPolaroid}
        className="debrief-victoria"
        alt="Victoria Strange"
        onClick={() => handleImageClick('Victoria')}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={jamesPolaroid}
        className="debrief-james"
        alt="James Jelin"
        onClick={() => handleImageClick('James')}
        style={{ cursor: 'pointer' }}
      />

      {modalVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            overflow: 'auto'
          }}
        >
          <div
            style={{
              background: '#21174C',
              // padding: '20px',
              // position: 'relative',
              width: '100%',
              height: '100%',
              overflowY: 'auto'
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1vw',
                right: '1vw',
                background: 'transparent',
                border: 'none',
                fontSize: '15vw',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              &times;
            </button>
            {modalContent==='Victoria' && 
              <div>
                <img src={victoriaPic} className="debrief-headshot"/>
                <div className='debrief-bio'>
                  Victoria Strange is an actor, director, & model best known for her portrayals of scream queens throughout the indie horror world (<i>Las Vegas Frankenstein, Murder Van, Slaughter on the Set</i>) as femme fatales across the burgeoning vertical drama-verse (<i>Sleeping Handsome, Entrapping The Heart of a Billionaire</i>) and her work within American Immersion Theater's LA company. When not performing across stage & screen (or the streets of Little Tokyo!) she can be found suspended on aerial silks, or tucked inside a personal fortress of books alongside her cats. Reach out via Instagram @victoriavstrange to chat about overlooked film soundtracks, climate justice, or your next great performance idea.
                </div>
              </div>
            }

            {modalContent==='James' && 
              <div>
                <img src={jamesPic} className="debrief-headshot"/>
                <div className='debrief-bio'>
                  James Jelin is a Hollywood-based improviser, actor, comedian, and drag queen. He performs at UCB with House team Local Tycoon and co-hosts UCB's Drag Lip Sync Competition. His training also includes Groundlings, Doug Warhit's Scene Study, The Commercial Class, Character Study with SNL's John Milhiser, and a degree in Theater from Bowdoin College. You can catch him in USATV's upcoming series Second Chances. On the side, James runs social media and fundraising programs for progressive political campaigns.
                </div>
              </div>
            }
          </div>
        </div>
      )}

      <div className="orangeLine"/>
      <br/>
      <br/>
      <br/>
      <div className="debrief-titles">Agent Shale Voice Work</div>
      <div className="debrief-names"><a href='https://www.thetarotnerd.com/' target="_blank" style={{color: 'white'}}>Tosca Minotto</a></div>
      <br/>
      <br/>
      <div className="debrief-titles">Agent Shale Model</div>
      <div className="debrief-names"><a href='https://www.campdouttents.com/about' target="_blank" style={{color: 'white'}}>Kitty Medina</a></div>
      <br/>
      <br/>
      <div className="debrief-titles">Agent Leslie Voice Work</div>
      <div className="debrief-names"><a href='https://www.instagram.com/momstomppodcast/?hl=en' target="_blank" style={{color: 'white'}}>Jo Scott</a></div>
      <br/>
      <br/>
      <div className="debrief-titles">Agent Papyrus Voice Work</div>
      <div className="debrief-names">Prescott Gadd</div>
      <br/>
      <br/>
      <div className="debrief-titles">Agent Papyrus Model</div>
      <div className="debrief-names">Peter Scott</div>
      <br/>
      <br/>
      <br/>
      <div className="orangeLine"/>
      <br/>
      <br/>
      <br/>
      <div className="debrief-titles">Created by</div>
      <div className="debrief-names">Prescott Gadd</div>
      <br/>
      <br/>
      <div className="debrief-titles">Operations by</div>
      <div className="debrief-names">Jen Staben</div>
      <br/>
      <br/>
      <div className="debrief-titles">Art and Design by</div>
      <div className="debrief-names"><a href='https://ccalleo.com/' target="_blank" style={{color: 'white'}}>Curtiss Calleo</a></div>
      <br/>
      <br/>
      <div className="debrief-titles">Special thanks to</div>
      <div className="debrief-names"><a href='https://williamoconnell.me/' target="_blank" style={{color: 'white'}}>William O'Connell / Subtext Game</a></div>
      <div className="debrief-titles">for tech advice</div>
      <br/>
      <br/>
      <br/>

      <div className="orangeLine"/>

      <div className="debrief-names">
        <br/>
        Thank you to our playtesters...<br/>
        <br/>
        John Anderson<br/>
        Molly Anderson<br/>
        Benjamin Berk<br/>
        Brian Biancardi<br/>
        Serena Bright<br/>
        Becky Cumberland<br/>
        Marlee Delia<br/>
        Annie Donley<br/>
        Rachel Donley<br/>
        Valerie Gansel<br/>
        Alex Haney<br/>
        Tim Heurlin<br/>
        Tommy Honton<br/>
        Kevin Horst<br/>
        Jared Jeffries<br/>
        James Jelin<br/>
        Tim Lamphier<br/>
        Phil Meister<br/>
        Geremy Mumenthaler<br/>
        Jeff Murdoch<br/>
        Anne Nemer<br/>
        Jordan Nomura<br/>
        Erin Rein<br/>
        James Ross<br/>
        Kate Ross<br/>
        Louis Ross<br/>
        Tyler Samples<br/>
        Harold Scissors<br/>
        Christine Shedd-Thompson<br/>
        Jen Staben<br/>
        Victoria Strange<br/>
        Meaghan Strickland<br/>
        Nina Zhao
      </div>


      
      
      <div style={{ fontSize: '5vw', textAlign: 'center', marginTop: '30vw'}}>
        <a href='https://www.instagram.com/spiesamong' target='_blank' rel="noreferrer"><img src={instagram} alt="Instagram" style={{ width: '10vw', marginBottom: '0', paddingBottom: '0'}}></img></a>
        <a href='https://www.facebook.com/spiesamong' target='_blank' rel="noreferrer"><img src={facebook} alt="Facebook" style={{ width: '10vw', marginBottom: '0', paddingBottom: '0'}}></img></a>
        <div style={{fontWeight: "normal"}}>2024 Interactive Escapes</div>
      </div>

    </div>
  )
}

export default Debrief;