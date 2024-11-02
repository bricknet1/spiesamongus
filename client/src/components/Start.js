import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';

function Start() {

  const history = useHistory();

  const formSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    phone: yup.string()
      .required('Phone is required')
      .matches(/^[0-9]{10}$/,'Phone number must be exactly 10 digits'),
    numberOfAgents: yup.string().required('Number of Agents is required'),
    friendPhone: yup.string().matches(/^[0-9]{10}$/,'Phone number must be exactly 10 digits'),
      // .when("numberOfAgents", {
      //   is: '2',
      //   then: yup.string()
      //     .required('Phone is required')
      //     .matches(/^[0-9]{10}$/,'Phone number must be exactly 10 digits'),
      //   // otherwise: yup.string().notRequired(),
      // }),
    agreeToTerms: yup.boolean().oneOf([true],'Agreeing to the terms and conditions is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      numberOfAgents: '1',
      friendPhone: '',
      agreeToTerms: false
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitted values:", values);

      fetch('/signupdb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(res => {
        if (res.ok) {
          res.json().then(user => {
            // setUser(user)
            history.push('/')
            // setValues(user)
          })
        } else {
          res.json().then(error => {
            console.log(error.error);
            if (error.error.includes('users_email_key') || error.error.includes('UNIQUE constraint failed: users.email')) {
              formik.setErrors({ email: 'An account with this email already exists' });
            }
            if (error.error.includes('users_username_key')) {
              formik.setErrors({ username: 'Username is taken' });
            }                  
            // setError(error.message)
          })
        };
      })
    }
  })
  console.log("Form Values:", formik.values);





  return (
    <div>

      <div className='header'>Welcome, Agent.</div>
      <div className='subheader'>We have a mission for you.</div>
      <div className='subsubheader'>
        <span className='rogueSpy'>A ROGUE SPY</span> is currently roaming the area. Use your phone and wits to uncover clues, reveal their plot, and deduce their whereabouts. Adventure and danger will be hiding from you in plain sight!
      </div>
      <div className='signupHeader'>MISSION SIGN-UP</div>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First name</label><br></br>
        <input type="text"  name="firstName" value={formik.values.firstName} onChange={formik.handleChange} /><br></br>
        <h3 style={{color:'#4FC9C2'}}> {formik.errors.firstName}</h3>

        <label htmlFor="lastName">Last name</label><br></br>
        <input type="text"  name="lastName" value={formik.values.lastName} onChange={formik.handleChange} /><br></br>
        <h3 style={{color:'#4FC9C2'}}> {formik.errors.lastName}</h3>

        <label htmlFor="email">Email</label><br></br>
        <input type="text"  name="email" value={formik.values.email} onChange={formik.handleChange} /><br></br>
        <h3 style={{color:'#4FC9C2'}}> {formik.errors.email}</h3>

        <label htmlFor="phone">Phone</label><br></br>
        <input type="tel"  name="phone" value={formik.values.phone} onChange={formik.handleChange} /><br></br>
        <h3 style={{color:'#4FC9C2'}}> {formik.errors.phone}</h3>

        <label htmlFor="numberOfAgents">Number of agents on your mission</label><br></br>
        <select name="numberOfAgents" id="numberOfAgents" value={formik.values.numberOfAgents} onChange={formik.handleChange} >
          <option value="1">1</option>
          <option value="2">2</option>
        </select><br/>The second agent will receive all the texts and clues you receive, but you will be responsible for replying to texts.<br/><br/>

        {formik.values.numberOfAgents === '2' && (
          <div id="friendPhone">
            <label htmlFor="friendPhone">Friend's Phone Number</label><br></br>
            <input type="tel"  name="friendPhone" value={formik.values.friendPhone} onChange={formik.handleChange} /><br></br>
          </div>
        )}
        <h3 style={{color:'#4FC9C2'}}> {formik.errors.friendPhone}</h3>

        <input type="checkbox" name="agreeToTerms" checked={formik.values.agreeToTerms} onChange={formik.handleChange}></input>I have read and agree to the <a href="https://www.spiesamong.us/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a>.
        <h3 style={{color:'#4FC9C2'}}> {formik.errors.agreeToTerms}</h3>

        <br/><br/>
        <input type='submit' value='Begin Mission' />
        {/* {error&& <h3 style={{color:'#4FC9C2'}}> {error}</h3>} */}
      </form>
    </div>
  );
}

export default Start;
