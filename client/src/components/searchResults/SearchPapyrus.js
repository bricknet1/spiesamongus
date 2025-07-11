import papyrusPic from '../../assets/pictures/Papyrus Polaroid.png';
import suggestionPic from '../../assets/pictures/Suggestion Box Form edited.jpg';
import trackingPic from '../../assets/pictures/Tracking Chip Classified edited.jpg';
import achievementPic from '../../assets/pictures/Notable Achievement Papyrus edited.jpg';

function SearchPapyrus() {

  return (
    <div>
      <div className='greenBar'>AGENT PAPYRUS FILES</div>

      <div className='searchHeading'>Agent Papyrus Profile Photo</div>

      <img src={papyrusPic} className="polaroid" alt="Agent Papyrus" />

      <div class="orangeLine"/>

      <div className='searchHeading'>Anonymous Form</div>

      <div className='searchBody' style={{textAlign: 'center'}}>
        (six years ago)
      </div>

      <img src={suggestionPic} className="otherSearchImage" alt="Suggestion Box Form" />

      <div class="orangeLine"/>

      <div className='searchHeading'>Agent Papyrus Tracking Chip</div>

      <div className='searchBody'>
        <i>(This experimental prototype was hidden in a package picked up by Agent Marble. We don't think Marble has any idea!)</i> 👀 👀
      </div>

      <img src={trackingPic} className="otherSearchImage" alt="Classified Envelope" />

      <div class="orangeLine"/>

      <div className='searchHeading'>Agent Papyrus Notable Achievement</div>

      <img src={achievementPic} className="otherSearchImage" alt="Award for the most unsuccessful mission in Agency history" />

      <div className='searchBody'>
        Operation Bubonic Curtsy mission files can be found under 'My Mission History.' (password required)
      </div>

    </div>
  )
}

export default SearchPapyrus;