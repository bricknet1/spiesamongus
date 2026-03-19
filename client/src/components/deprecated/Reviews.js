import HamburgerMenuHeader from "./HamburgerMenuHeader.js";
import SocialFooter from "./SocialFooter.js";
import useDeviceType from "./UseDeviceType.js";
import laTimes from '../assets/pictures/LA Times article.jpg';
import noPro from '../assets/pictures/no pro.jpg';

function Reviews() {

  const isMobile = useDeviceType();

  const orangeBar = isMobile ? "orangeBar" : "orangeBarDesktop";

  const orangeBarFontSize = {
    fontSize: isMobile ? "8vw" : "60px"
  }

  const pageContentStyle = {
    paddingBottom: isMobile ? "3vw" : "10px"
  };

  const mainStyle = {
    fontSize: isMobile ? "4.5vw" : "18px",
    fontWeight: "normal",
    width: isMobile ? "90vw" : "850px",
    paddingLeft: isMobile ? "5vw" : "",
    lineHeight: isMobile ? "8vw" : "30px",
    margin: isMobile ? "" : "0 auto",
    textAlign:"center"
  };

  const reviewBody = {
    fontSize: isMobile ? "8vw": "50px",
    fontWeight:"bold",
    color:"#F9DF39",
    lineHeight: isMobile ? "" : "60px"
  };

  const reviewBodyLonger = {
    fontSize: isMobile ? "6vw": "32px",
    fontWeight:"bold",
    color:"#F9DF39",
    lineHeight: isMobile ? "" : "50px"
  };

  const reviewer = {
    fontSize: isMobile ? "8vw": "32px",
    fontWeight:"bold",
    color:"#FFFFFF",
    textAlign: "right" 
  };

  const laTimesStyle = {
    border: "5px solid #F9DF39",
    width: isMobile ? "80vw" : "400px"
  }

  const noProStyle = {
    border: "5px solid #F9DF39",
    width: isMobile ? "80vw" : "700px"
  }

  return (
    <div className="pageContent" style={pageContentStyle}>

      <title>Reviews | Spies Among Us</title>

      <HamburgerMenuHeader/>

      <div className={orangeBar} style={orangeBarFontSize}>SPIES AMONG US REVIEWS</div>

      <div style={mainStyle}>

        <br/>

        <div style={reviewBodyLonger}>"a work of theater that unfolds throughout Little Tokyo, a game that allows us to become the protagonist, and every stranger an unwitting extra."</div><br/>
        <div style={reviewer}>-Todd Martens, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://www.latimes.com/travel/story/2024-09-12/a-thrilling-way-to-see-little-tokyo-chase-down-a-spy-in-this-interactive-mystery-game">LA Times</a></div><br/>
        <a target="_blank" rel="noopener noreferrer" href="https://www.latimes.com/travel/story/2024-09-12/a-thrilling-way-to-see-little-tokyo-chase-down-a-spy-in-this-interactive-mystery-game"><img src={laTimes} style={laTimesStyle} alt="LA Times Article"/></a><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBodyLonger}>"It was thrilling to be receiving multiple messages with instructions as to where to go next and who to look out for as we dodged dog walkers and zigzagged through couples who were out for a stroll. The roughly 90-minute experience seemed to go by in a breeze."</div><br/>
        <div style={reviewer}>-Kathryn Yu, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://noproscenium.com/immersive-review-rundown-the-one-with-liminal-office-spaces-ancient-myths-7454a1289370">No Proscenium</a></div><br/>
        <a target="_blank" rel="noopener noreferrer" href="https://noproscenium.com/immersive-review-rundown-the-one-with-liminal-office-spaces-ancient-myths-7454a1289370"><img src={noPro} style={noProStyle} alt="LA Times Article"/></a><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"It's priced at a ridiculously good value for what you get. Has a great mixture of humor and intrigue and deception and puzzle solving."</div><br/>
        <div style={reviewer}>-Ethan H, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://maps.app.goo.gl/bD9FKXFnY6hfgwNR8">Google Reviews</a></div><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"Makes you feel like you're part of a James Bond flick,"</div><br/>
        <div style={reviewer}>-John Vilja, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://www.youtube.com/watch?v=Sf1IYhUV9JI">YouTube</a></div><br/>
        <iframe style={{ width: "100%", height: isMobile ? "50vw" : "500px" }} src="https://www.youtube.com/embed/Sf1IYhUV9JI?si=hi5f-36VCu-_509D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"The game itself is so fun (and funny!) to play and on top of that it’s a great way to explore/discover a new part of LA."</div><br/>
        <div style={reviewer}>-Meaghan S, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://maps.app.goo.gl/oMaC4gnBxHXutAw47">Google Reviews</a></div><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"The story's twists kept me on edge, and the plot made every moment more intense. A must for adventure seekers!"</div><br/>
        <div style={reviewer}>-Jon W, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://maps.app.goo.gl/YDHJRRBbF7yf8Nst7">Google Reviews</a></div><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"I felt like I was on an episode of The Mole or The Amazing Race. Highly recommended, very much worth the price."</div><br/>
        <div style={reviewer}>-Jennifer N, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://www.tripadvisor.com/ShowUserReviews-g32655-d27950047-r985184581-Spies_Among_Us_An_Immersive_Adventure-Los_Angeles_California.html?m=19905">Tripadvisor</a></div><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"Genuinely funny at times, with one moment of suspense about 3/4 of the way through that had my heart unexpectedly racing"</div><br/>
        <div style={reviewer}>-Brian D, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://www.tripadvisor.com/Attraction_Review-g32655-d27950047-Reviews-Spies_Among_Us_An_Immersive_Adventure-Los_Angeles_California.html">Tripadvisor</a></div><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"If you have a kid, take them to it."</div><br/>
        <div style={reviewer}>-<a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://open.spotify.com/episode/0IRXBOzyl4YMzNQe47Ymce?si=ed72917515bd4599">Mom Stomp Podcast</a></div><br/>
        <iframe  src="https://open.spotify.com/embed/episode/0IRXBOzyl4YMzNQe47Ymce?utm_source=generator" width="100%" height="352" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify podcast player"></iframe><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"Delivers big on fun, humor, and a great time. A perfect way to spend 1-2 hours solving puzzles with a small group of friends, an afternoon date with your significant other, or even just venturing out on your own. 10/10 would highly recommend!"</div><br/>
        <div style={reviewer}>-Ambulacralgroove, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://www.tripadvisor.com/ShowUserReviews-g32655-d27950047-r994383229-Spies_Among_Us_An_Immersive_Adventure-Los_Angeles_California.html?m=19905">Tripadvisor</a></div><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"The pacing and spy theme are exciting, the puzzles at an accessible level of difficulty, and the sense of humor had my wife and I laughing."</div><br/>
        <div style={reviewer}>-Jonathan Z, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://maps.app.goo.gl/yuP3XDBWUkaW6hQk8">Google Reviews</a></div><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"Spies Among Us makes for a fantastic little thriller!"</div><br/>
        <div style={reviewer}>-Jensen L, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://www.tripadvisor.com/ShowUserReviews-g32655-d27950047-r1004295813-Spies_Among_Us_An_Immersive_Adventure-Los_Angeles_California.html?m=19905">Tripadvisor</a></div><br/>
        <br/>
        <br/>
        <br/>

        <div style={reviewBody}>"Such a unique and fun way to spend time exploring Little Tokyo. I can't wait for more adventures."</div><br/>
        <div style={reviewer}>-Justin D, <a target="_blank" rel="noopener noreferrer" style={{"color":"#FFFFFF"}} href="https://www.tripadvisor.com/ShowUserReviews-g32655-d27950047-r994362654-Spies_Among_Us_An_Immersive_Adventure-Los_Angeles_California.html?m=19905">Tripadvisor</a></div><br/>
        <br/>
        <br/>
        <br/>

      </div>

      <SocialFooter/>

    </div>
  )
}

export default Reviews;