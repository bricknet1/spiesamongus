import lesliePic from '../assets/pictures/Leslie.jpg';

function LeslieFooter({unfixed}) {

  return (
    <div className={unfixed ? null : 'leslieFooter'}> {/* will be a fixed position by default unless "true" is passed in */}
      <div className="orangeLine"/>
      <div className="leslieFooterContent">
        <div className="leslieFooterPicWrapper">
          <img src={lesliePic} className="leslieFooterPic" alt="Agent Leslie" />
        </div>

        <div className="leslieFooterText">
          Having a catastrophic issue with your mission? Text <a className='textLeslieLink' target="_blank" rel="noreferrer" href="sms:+18778477437"><u>Agent Leslie</u></a> for help!
        </div>
      </div>
    </div>
  );
}

export default LeslieFooter;