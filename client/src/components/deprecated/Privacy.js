import HamburgerMenuHeader from "./HamburgerMenuHeader.js";
import SocialFooter from "./SocialFooter.js";
import useDeviceType from "./UseDeviceType.js";

function Privacy() {

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
    margin: isMobile ? "" : "0 auto"
  };

  const boldStyle = {
    fontSize: isMobile ? "8vw": "32px",
    fontWeight:"bold"
  };

  return (
    <div className="pageContent" style={pageContentStyle}>

      <title>Privacy | Spies Among Us</title>

      <HamburgerMenuHeader/>

      <div className={orangeBar}>PRIVACY POLICY</div>

      <div style={mainStyle}>

        <br/>

        This privacy policy explains how Interactive Escapes LLC uses any personal information we collect about you when you use this website.<br/>
        <br/>

        <span style={boldStyle}>WHAT INFORMATION DO WE COLLECT?</span><br/>
        We collect information about you when you fill in a contact form or email us directly, including your name, email address, mailing address, and phone number.<br/>
        <br/>

        <span style={boldStyle}>DO WE SHARE YOUR DATA?</span><br/>
        We will never share or sell any of your data with other parties.<br/>
        <br/>
        

        <span style={boldStyle}>WHY DO WE COLLECT DATA?</span><br/>
        We collect information about you to: fulfill your request, e.g. if you fill out a form to play the Spies Among Us game, and, if you agree, to email you about other products, services, and information we think might be of interest to you. We might contact you directly to follow up on the service and user experience we provide.<br/>
        <br/>
        
        <span style={boldStyle}>HOW LONG DO WE KEEP YOUR DATA?</span><br/>
        If Interactive Escapes LLC provides any paid for services to you, we keep your basic personal data (name, address, contact details) for a minimum of seven years. Your information we use for marketing purposes will be kept with us until you notify us that you no longer wish to be contacted by us.<br/>
        <br/>

        

        <span style={boldStyle}>MARKETING</span><br/>
        We would like to send you updates and information about products and services of ours which might be of interest to you. If you have consented to receive marketing, you may opt out at a later date. You have a right at any time to stop us from contacting you for marketing purposes or giving your information to other parties. If you no longer wish to be contacted for marketing purposes please contact us.<br/>
        <br/>

        

        <span style={boldStyle}>OTHER WEBSITES</span><br/>
        Our website contains links to other websites. This privacy policy only applies to this website. If you visit other websites, be sure to read their own privacy policies.<br/>
        <br/>

        

        <span style={boldStyle}>CHANGES TO OUR PRIVACY POLICY</span><br/>
        Any updates to our privacy policy will be posted on this web page. This privacy policy was last updated on January 24th, 2024.<br/>
        <br/>

          

        <span style={boldStyle}>HOW TO CONTACT US</span><br/>
        Please contact us if you have any questions about our privacy policy or information we hold about you:<br/>
        <br/>
        <a href="mailto:contact@interactiveescapes.com" style={{color:"white", textDecoration: "none"}}>contact@interactiveescapes.com</a>

        </div>

        <SocialFooter/>

    </div>
  )
}

export default Privacy;