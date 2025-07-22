import HamburgerMenuHeader from "./HamburgerMenuHeader.js";
import SocialFooter from "./SocialFooter.js";
import useDeviceType from "./UseDeviceType.js";

function Terms() {

  const isMobile = useDeviceType();

  const orangeBar = isMobile ? "orangeBar" : "orangeBarDesktop";
  const termsContainer = isMobile ? "termsContainer" : "termsContainerDesktop";
  const termsHeading = isMobile ? "termsHeading" : "termsHeadingDesktop";
  const termsOL = isMobile ? "termsOL" : "termsOLDesktop";
  const termsUL = isMobile ? 'termsUL' : 'termsULDesktop';

  return (
    <div>
      <title>Terms & Conditions</title>

      <HamburgerMenuHeader unfixed={true}/>

      <div className={orangeBar}>TERMS & CONDITIONS</div>

      <div className={termsContainer}>

        <div className={termsHeading}>Participant Agreement and Release of Liability Waiver</div>

        <ol>

          <li className={termsOL}>Assumption of Risk:</li>
          <ul>
            <li className={termsUL}>You understand that participating in the experience involves certain risks, including but not limited to physical exertion, exposure to weather conditions, and potential hazards associated with traffic and public spaces.</li>
            <li className={termsUL}>You voluntarily assume all risks associated with your participation in this event.</li>
          </ul>

          <li className={termsOL}>Traffic Laws and Safety:</li>
          <ul>
            <li className={termsUL}>You agree to follow all local, state, and federal traffic laws and regulations during the experience.</li>
            <li className={termsUL}>You will exercise caution when crossing streets, using crosswalks, and interacting with vehicular traffic.</li>
          </ul>


          <li className={termsOL}>Responsible Behavior</li>
          <ul>
            <li className={termsUL}>You will treat all actors, event staff, and members of the general public with respect and politeness.</li>
            <li className={termsUL}>You understand that you may mistakenly interact with a member of the general public while searching for the actor. You will politely leave them alone if so.</li>
          </ul>

          <li className={termsOL}>Release of Liability:</li>
          <ul>
            <li className={termsUL}>In consideration of being allowed to participate in the experience, you hereby release and discharge Interactive Escapes LLC, its officers, volunteers, sponsors, and affiliates from any and all claims, liabilities, demands, actions, or causes of action arising out of your participation in the event.</li>
            <li className={termsUL}>You waive any right to seek compensation for injuries, damages, or losses incurred during the experience.</li>
          </ul>

          <li className={termsOL}>Use of Image in Marketing:</li>
          <ul>
            <li className={termsUL}>You grant permission to Interactive Escapes LLC to use your likeness, including photographs and videos taken during the event, for promotional purposes.</li>
            <li className={termsUL}>You understand that your image may appear in posts, advertisements, and other promotional materials and waive any right to compensation for such use.</li>
          </ul>

          <li className={termsOL}>Sharing the Waiver with Other Participants:</li>
          <ul>
            <li className={termsUL}>You agree to share this liability waiver with all other members of your party who are participating in the experience.</li>
            <li className={termsUL}>It is your responsibility to ensure that everyone in your group is aware of and agrees to the terms outlined in this waiver.</li>
          </ul>

          <li className={termsOL}>Expectations of the Experience</li>
          <ul>
            <li className={termsUL}>You will receive texts, receive physical objects, and be directed where to walk from texts and websites on your phone.</li>

            <li className={termsUL}>No one will ever approach you and tell you to:
              <ol>
                <li className={termsUL}>Go somewhere.</li>
                <li className={termsUL}>Get into a vehicle.</li>
                <li className={termsUL}>Give them money.</li>
              </ol>
            </li>
          </ul>

          <li className={termsOL}>SMS/MMS Mobile Messages​</li>
          <ul>
          <li className={termsUL}>By signing up, you agree to receive recurring automated text messages from Interactive Escapes LLC. Reply STOP to cancel. Msg frequency varies. Msg & data rates may apply.</li>
          </ul>

        </ol>

      </div>
      <SocialFooter/>

    </div>
  )
}

export default Terms;