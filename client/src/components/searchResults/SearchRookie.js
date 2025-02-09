import rookiePic from '../../assets/pictures/Rookie Polaroid.png';


function SearchRookie() {

  return (
    <div>
      <div className='greenBar'>AGENT ROOKIE FILES</div>

      <div className='searchHeading'>Profile Photo missing</div>

      <img src={rookiePic} className="polaroid" alt="Agent Rookie" />

      <div class="orangeLine"/>

      <div className='searchBody'>
        <br/>
        Agent Rookie is a highly sought after recruit with reams of potential. Their lack of experience currently makes them expendable but we will reconsider after the conclusion of Operation Filthy Laundry. 
      </div>

    </div>
  )
}

export default SearchRookie;