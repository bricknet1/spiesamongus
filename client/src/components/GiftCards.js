import HamburgerMenuHeader from "./HamburgerMenuHeader.js";
import SocialFooter from "./SocialFooter.js";
import useDeviceType from "./UseDeviceType.js";
import Questions from "./Questions.js";

function GiftCards() {

  const isMobile = useDeviceType();

  const orangeBar = isMobile ? "orangeBar" : "orangeBarDesktop";

  const pageContentStyle = {
    paddingBottom: isMobile ? "3vw" : "10px"
  };

  const mainStyle = {
    fontSize: isMobile ? "4.5vw" : "18px",
    fontWeight: "normal",
    width: isMobile ? "90vw" : "1000px",
    paddingLeft: isMobile ? "5vw" : "",
    lineHeight: isMobile ? "8vw" : "30px",
    margin: isMobile ? "" : "0 auto",
    textAlign:"center"
  };

  const boldStyle = {
    fontSize: isMobile ? "8vw": "32px",
    fontWeight:"bold"
  };

  return (
    <div className="pageContent" style={pageContentStyle}>

      <title>Gift Cards | Spies Among Us</title>

      <HamburgerMenuHeader unfixed={true}/>

      <div className={orangeBar}>GIFT CARDS</div>

      <div style={mainStyle}>

        <br/>

        <span style={boldStyle}>Give the gift of espionage with a<br/><a target="_blank" rel="noopener noreferrer" style={{"color":"#F9DF39"}} href="https://offthecouch.io/book/spies/gift-card">spy mission gift card!</a></span><br/>
        IMAGE HERE
        <br/>
        <br/>

        </div>

        <Questions />

        <SocialFooter/>

    </div>
  )
}

export default GiftCards;