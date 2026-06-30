import lesliePic from '../assets/pictures/Leslie.jpg';
import { useSubdomain } from './SubdomainProvider.js';

const LESLIE_PHONE_APP = '+18778477437';
const LESLIE_PHONE_SEATTLE = '+18773275007';

function LeslieFooter({unfixed}) {
  const subdomain = useSubdomain();
  const lesliePhone = subdomain === 'seattle' ? LESLIE_PHONE_SEATTLE : LESLIE_PHONE_APP;

  return (
    <div className={unfixed ? null : 'leslieFooter'}> {/* will be a fixed position by default unless "true" is passed in */}
      <div className="orangeLine"/>
      <div className="leslieFooterContent">
        <div className="leslieFooterPicWrapper">
          <img src={lesliePic} className="leslieFooterPic" alt="Agent Leslie" />
        </div>

        <div className="leslieFooterText">
          Having a catastrophic issue with your mission? Text <a className='textLeslieLink' target="_blank" rel="noreferrer" href={`sms:${lesliePhone}`}><u>Agent Leslie</u></a> for help!
        </div>
      </div>
    </div>
  );
}

export default LeslieFooter;