import * as yup from "yup";
import { useFormik } from "formik";

function Start() {

  const formSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email').required('Email is required'),
    username: yup.string().required('Username is required').max(10, "Username can't exceed 10 characters"),
    password: yup.string().required('Password is required'),
      // .min(5, 'Your password is too short.')
      // .matches(/[a-zA-Z]/, 'Password can only contain letters.'),
    passwordconfirm: yup
      .string()
      .required("Must confirm password.")
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      numberOfAgents: ''
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      buttonSoundPlay.play()
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
            setUser(user)
            history.push('/')
            setValues(user)
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
            setError(error.message)
          })
        };
      })
    }
  })






  return (
    <div>
      <div>Welcome, Agent.</div>;<div>We have a mission for you.</div>;
      <div>
        <div>A ROGUE SPY</div> is currently roaming the area. Use your phone and
        wits to uncover clues, reveal their plot, and deduce their whereabouts.
        Adventure and danger will be hiding from you in plain sight!
      </div>
      ;<div>MISSION SIGN-UP</div>;
    </div>
  );
}

export default Start;
