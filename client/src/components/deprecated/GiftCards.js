import HamburgerMenuHeader from "./HamburgerMenuHeader.js";
import SocialFooter from "./SocialFooter.js";
import useDeviceType from "./UseDeviceType.js";
import Questions from "./Questions.js";
import giftCardPic from '../assets/pictures/Spies Gift Card.png';

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
    fontSize: isMobile ? "8vw": "50px",
    fontWeight:"bold",
    lineHeight: "50px"
  };

  const giftCardPicStyle = {
    width: isMobile ? "64vw": "560px"
  };

  const olStyle = {
    paddingLeft: isMobile ? "10vw" : "80px",
  }

  const redeemInstructionsStyle = {
    fontSize: isMobile ? "6.5vw": "40px",
    fontWeight:"bold",
    lineHeight: isMobile ? "10vw" : "50px",
    textAlign:"left",
    width: isMobile ? "90vw" : "1100px",
    margin: isMobile ? "" : "0 auto",
    paddingLeft: isMobile ? "5vw" : "",
    paddingTop: isMobile ? "5vw" : "50px"
  }

  return (
    <div className="pageContent" style={pageContentStyle}>

      <title>Gift Cards | Spies Among Us</title>

      <HamburgerMenuHeader/>

      <div className={orangeBar}>GIFT CARDS</div>

      <div style={mainStyle}>

        <br/>

        <span style={boldStyle}>Give the gift of espionage with a<br/><a target="_blank" rel="noopener noreferrer" style={{"color":"#F9DF39"}} href="https://offthecouch.io/book/spies/gift-card">spy mission gift card</a>!</span><br/>
        <br/>
        <a target="_blank" rel="noopener noreferrer" href="https://offthecouch.io/book/spies/gift-card"><img src={giftCardPic} style={giftCardPicStyle} alt="Gift Card"/></a>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className={orangeBar}>REDEEM GIFT CARDS</div>
      <div style={redeemInstructionsStyle}>
        To redeem a Spies Among Us Gift Card:
        <ol style={olStyle}>
          <li>Go to our <a target="_blank" rel="noopener noreferrer" href="https://offthecouch.io/book/spies/gift-card" style={{"color":"#F9DF39"}}>ticketing site.</a></li>
          <li>Pick a day and time for your mission.</li>
          <li>Click through all the way to checkout. (ignore the promo code box)</li>
          <li>Change payment type to "gift card" and enter your gift card card code.</li>
        </ol>
      <br/>

      </div>

        <Questions />

        <SocialFooter/>

    </div>
  )
}

export default GiftCards;