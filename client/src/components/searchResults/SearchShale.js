import shalePic from '../../assets/pictures/Shale Polaroid full size.png';
import shaleAchievementPic from '../../assets/pictures/Notable Achievement Shale 11.21.23.jpg';

function SearchShale() {

  return (
    <div>
      <div className='greenBar'>AGENT SHALE FILES</div>

      <div className='searchHeading'>Agent Shale Profile Photo</div>

      <img src={shalePic} className="polaroid" alt="Agent Shale" />

      <div style={{textAlign: 'center', fontSize: '6vw'}}>Actual name: <strong>Claudia Ripper</strong>.<br/><br/></div>

      <div class="orangeLine"/>

      <div className='searchHeading'>Agent Shale Notable Achievement</div>

      <img src={shaleAchievementPic} className="otherSearchImage" alt="Achievement Document" />

      <div className='searchBody'>
        Operation Bubonic Curtsy mission files can be found under "My Mission History." (password required)
      </div>

    </div>
  )
}

export default SearchShale;