import Questions from "./Questions.js";
import SocialFooter from "./SocialFooter.js";
import useDeviceType from "./UseDeviceType.js";

function TopBuyButtonComponent() {
  return (
    <stripe-buy-button
      buy-button-id="buy_btn_1QaPo7EtWxX2z5rqaHSu0Ogp"
      publishable-key="pk_live_DMm4bI0jUPKs4HUd2LVxZTTF"
    ></stripe-buy-button>
  );
}

function BottomBuyButtonComponent() {
  return (
    <stripe-buy-button
      buy-button-id="buy_btn_1PfrA9EtWxX2z5rqufPkW4f6"
      publishable-key="pk_live_DMm4bI0jUPKs4HUd2LVxZTTF"
    ></stripe-buy-button>
  );
}

function Payment() {
  const isMobile = useDeviceType();

  const orangeBar = isMobile ? "orangeBar" : "orangeBarDesktop";

  const style = {
    alignContent: "center",
    textAlign: "center",
    display: "block",
    margin: "0 auto",
    width: isMobile ? "90vw" : "600px",
    fontSize: isMobile ? "7vw" : "32px",
    fontStyle: "italic",
  };



  return (
    <div className="pageContent" style={{ paddingBottom: "10vw" }}>
      <title>Payment Page | Spies Among Us</title>

      <div className={orangeBar}>PAYMENT PAGE</div>

      <div style={style}>
        <br />
        <br />
        <br />
        <div>
          Click the "Get Tickets" button to go to our payment page where you can
          select your quantity of tickets.
        </div>
        <br />
        <TopBuyButtonComponent />
        <br />
        <br />
        <br />
      </div>

      <div className={orangeBar}>GENERAL PAYMENTS</div>

      <div
        style={style}
      >
        <br />
        <br />
        <br />
        <div>
          Enter the requested amount and click pay to go to the checkout page.
        </div>
        <br />
        <BottomBuyButtonComponent />
        <br />
        <br />
        <br />
      </div>

      <Questions />

      <SocialFooter />
    </div>
  );
}

export default Payment;
