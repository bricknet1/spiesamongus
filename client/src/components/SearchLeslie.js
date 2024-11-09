import lesliePic from '../assets/pictures/Leslie Polaroid.png';


function SearchLeslie() {

  return (
    <div>
      <div className='greenBar'>AGENT LESLIE FILES</div>

      <div className='searchHeading'>Agent Leslie Profile Photo</div>

      <img src={lesliePic} className="polaroid" alt="Agent Leslie" />

      <div class="orangeLine"/>

      <div className='searchHeading'>CURRENT ROLE</div>

      <div className='searchBody'>
        Employed at Agency Nov 2001 - Ongoing
      </div>

      <div class="orangeLine"/>

      <div className='searchHeading'>EDUCATION</div>

      <div className='searchBody'>
        B.A. - Saint John's University
      </div>

      <div class="orangeLine"/>

      <div className='searchHeading'>WORK EXPERIENCE</div>

      <div className='searchBody'>
        Head of Human Resources, Microsoft 1996-2001 
      </div>

    </div>
  )
}

export default SearchLeslie;