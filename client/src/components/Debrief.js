import notepadPic from '../assets/pictures/personal notes.jpg';

import { useState } from 'react';


function Debrief() {

  const [oneToggled, setOneToggled] = useState(false);
  const [twoToggled, setTwoToggled] = useState(false);
  const [threeToggled, setThreeToggled] = useState(false);
  const [fourToggled, setFourToggled] = useState(false);
  const [fiveToggled, setFiveToggled] = useState(false);


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







































      {/* <div className="ovalPicWrapper">
        <img src={notepadPic} className="ovalPic" alt="notepad" />
      </div>

      <div className='myHistoryHeading'>Agent Papyrus, click on a mission below to see your personal notes.</div> */}

      
      


    </div>
  )
}

export default Debrief;