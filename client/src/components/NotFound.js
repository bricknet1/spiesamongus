import instagram from '../assets/pictures/instagram.webp';

function NotFound() {

  return (
    <div className='pageContent' style={{ fontSize: '10vw', margin: '0 auto', width: '90vw', textAlign: 'center' }}>
      <title>Spies Among Us</title>
      <br/>THERE'S NOTHING HERE AGENT...<br/><br/><br/><br/><br/><br/><br/><br/>
      <a href='https://www.instagram.com/spiesamong' target='_blank' rel="noreferrer"><img src={instagram} alt="Instagram" style={{ width: '10vw', marginBottom: '0', paddingBottom: '0'}}></img></a>
      <div style={{ fontSize: '5vw', fontWeight: "normal"}} >2024 Interactive Escapes</div>
    </div>
  )
}

export default NotFound;