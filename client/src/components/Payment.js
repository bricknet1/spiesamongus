import Questions from "./Questions.js";
import SocialFooter from "./SocialFooter.js";

function Payment() {

  return (
    <div className="pageContent" style={{paddingBottom:'10vw'}}>

      <title>Payment Page | Spies Among Us</title>

      <div className='orangeBar'>PAYMENT PAGE</div>

      <div style={{alignContent: 'center', textAlign: 'center', display: 'block', margin: '0 auto', width: '90vw'}}>

        <br/>
        <br/>
        <br/>
        <div style={{fontSize: '7vw', fontStyle: 'italic'}}>Click the "Get Tickets" button to go to out payment page where you can select your quantity of tickets.</div>
        <br/>
        <br/>
        <br/>

      </div>

      <div className='orangeBar'>GENERAL PAYMENTS</div>

      <div style={{alignContent: 'center', textAlign: 'center', display: 'block', margin: '0 auto', width: '90vw'}}>

        <br/>
        <br/>
        <br/>
        <div style={{fontSize: '7vw', fontStyle: 'italic'}}>Enter the requested amount and click pay to go to the checkout page.</div>
        <br/>
        <br/>
        <br/>

      </div>

      <Questions/>

      <SocialFooter/>

    </div>
  )
}

export default Payment;