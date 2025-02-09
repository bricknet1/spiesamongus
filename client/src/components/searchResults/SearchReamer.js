import reamerPic from '../../assets/pictures/Reamer Polaroid.png';


function SearchReamer() {

  return (
    <div>
      <div className='greenBar'>THE REAMER FILES</div>

      <div className='searchHeading'>Profile Photo missing</div>

      <img src={reamerPic} className="polaroid" alt="The Reamer" />

      <div class="orangeLine"/>

      <div className='searchBody'>
        <br/>
        The Reamer is an alias used by Agent *****. For more information look up Agent *****'s files.
      </div>


    </div>
  )
}

export default SearchReamer;