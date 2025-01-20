import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

function Start() {
  const history = useHistory();

  const formSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    numberOfAgents: yup.string().required("Number of Agents is required"),
    friendPhone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    // .when("numberOfAgents", {
    //   is: '2',
    //   then: yup.string()
    //     .required('Phone is required')
    //     .matches(/^[0-9]{10}$/,'Phone number must be exactly 10 digits'),
    //   // otherwise: yup.string().notRequired(),
    // }),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "Agreeing to the terms and conditions is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      numberOfAgents: "1",
      friendPhone: "",
      agreeToTerms: false,
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitted values:", values);

      fetch("https://hook.us1.make.com/0hjpqsprwulf8d7oq9ybw2byuz5je95n", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          console.log("successful response", res);
        } else {
          res.json().then((error) => {
            console.error(error.error);
            // if (
            //   error.error.includes("users_email_key") ||
            //   error.error.includes("UNIQUE constraint failed: users.email")
            // ) {
            //   formik.setErrors({
            //     email: "An account with this email already exists",
            //   });
            // }
            // setError(error.message)
          });
        }
      });
    },
  });
  console.log("Form Values:", formik.values);

  // const callWebhook = async () => {
  //   const webhookUrl = "https://hook.us1.make.com/0hjpqsprwulf8d7oq9ybw2byuz5je95n";
  //   const data = {something: "something else"};

  //   try {
  //     const response = await fetch(webhookUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data)
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Webhook response:", result);
  //     } else {
  //       console.error("Failed to call webhook:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error calling webhook:", error);
  //   }
  // };
    


  return (
    <div className="pageContent">
      DON'T USE THIS PAGE ANYMORE. USE /BEGIN
      <title>Start Mission | Spies Among Us</title>

      <div className="start-header">Welcome, Agent.</div>
      <div className="start-subheader">We have a mission for you.</div>
      <div className="start-subsubheader">
        <span className="rogueSpy">A ROGUE SPY</span> is currently roaming the
        area. Use your phone and wits to uncover clues, reveal their plot, and
        deduce their whereabouts. Adventure and danger will be hiding from you
        in plain sight!
      </div>
      <div className="orangeBar">MISSION SIGN-UP</div>

      <form onSubmit={formik.handleSubmit} className="startPageForm">
        <label htmlFor="firstName">First name</label>
        <br />
        <input
          type="text"
          name="firstName"
          className="formField"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        <br />
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.firstName}</h3>

        <label htmlFor="lastName">Last name</label>
        <br />
        <input
          type="text"
          name="lastName"
          className="formField"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        <br />
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.lastName}</h3>

        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          className="formField"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <br />
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.email}</h3>

        <label htmlFor="phone">Phone</label>
        <br />
        <input
          type="tel"
          name="phone"
          className="formField"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <br />
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.phone}</h3>

        <label htmlFor="numberOfAgents">Number of agents on your mission</label>
        <br />
        <select
          name="numberOfAgents"
          id="numberOfAgents"
          className="formField"
          value={formik.values.numberOfAgents}
          onChange={formik.handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <br />
        <br />

        <span className="secondAgentText">
          The second agent will receive all the texts and clues you receive, but
          you will be responsible for replying to texts.
        </span>
        <br />
        <br />

        {formik.values.numberOfAgents === "2" && (
          <div id="friendPhone">
            <label htmlFor="friendPhone">Friend's Phone Number</label>
            <br />
            <input
              type="tel"
              name="friendPhone"
              className="formField"
              value={formik.values.friendPhone}
              onChange={formik.handleChange}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.friendPhone}</h3>

        <label>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formik.values.agreeToTerms}
              onChange={formik.handleChange}
            />
            <span className="checkbox"></span>
            <span className="checkboxLabel">
              I have read and agree to <br />
              the{" "}
              <a href="./terms" target="_blank" rel="noopener noreferrer">
                terms and conditions
              </a>
              .
            </span>
          </div>
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.agreeToTerms}</h3>
        </label>

        <br />
        <br />
        <input type="submit" value="Begin Mission" className="submitButton" />
        {/* {error&& <h3 style={{color:'#4FC9C2'}}> {error}</h3>} */}
      </form>
    </div>
  );
}

export default Start;
