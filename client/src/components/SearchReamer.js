import dylanPic from '../assets/pictures/Dylan Polaroid.png';


function SearchReamer() {

  return (
    <div>
      <div className='greenBar'>AGENT DYLAN FILES</div>

      <div className='searchHeading'>Agent Dylan Profile Photo</div>

      <img src={dylanPic} className="polaroid" alt="Agent Dylan" />

      <div class="orangeLine"/>

      <div className='searchHeading'>CURRENT ROLE</div>

      <div className='searchBody'>
        Employed at Agency Nov 2017 - Ongoing
        <br/>
        First Assistant to Agent Papyrus
        <br/>
        <br/>
        Also acts as the ****** for use in *******, ****** *******.
      </div>

      <div class="orangeLine"/>

      <div className='searchHeading'>EDUCATION</div>

      <div className='searchBody'>
        Majored in Attacking with a thesis on subtlety and pain. Minored in torture.
      </div>

      <div class="orangeLine"/>

      <div className='searchHeading'>WORK EXPERIENCE</div>

      <div className='searchBody'>
        Excelled in combatant tracking and hunting during the ***** campaign of the war in ***********.
      </div>

    </div>
  )
}

export default SearchReamer;