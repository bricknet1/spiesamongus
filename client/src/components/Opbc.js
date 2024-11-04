import { useState } from 'react';

function Opbc() {

  const [password, setPassword] = useState('');
  const [submittedPassword, setSubmittedPassword] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted value:", password);
    setSubmittedPassword(password)
  }




  return (
    <div className='pageContent'>

      <title>Operation Bubonic Curtsy</title>

      <div className='orangeBar'>OPERATION BUBONIC CURTSY</div>

      <div className='opbc-subheader'>WARNING! Classified files. Enter password to continue.</div>



      <form onSubmit={handleSubmit} className="opbcPageForm">

        <input
          type="text" 
          name="password"
          className="passwordFormField"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="passwordButton">Enter</button>

      </form>



      {submittedPassword==="test" && <div className='orangeBar'>test successful</div>}
      {submittedPassword==="test2" && <div className='orangeBar'>test 2 successful</div>}
      {submittedPassword==="test3" && <div className='orangeBar'>test 3 successful</div>}


    </div>
  );
}

export default Opbc;
