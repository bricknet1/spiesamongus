import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function Begin() {
  const history = useHistory();

  const formSchema = yup.object().shape({
    firstName: yup.string().required("Enter a first name"),
    lastName: yup.string().required("Enter a last name"),
    phone1: yup
      .string()
      .required("Enter a 10 digit phone number")
      .matches(/^[0-9]{10}$/, "Enter a 10 digit phone number"),
    name2: yup.string().test(
      "required-player2-name",
      "Enter a name for Player 2",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 2 || !!value;
      }
    ),
    phone2: yup.string().test(
      "required-player2-phone",
      "Enter a 10 digit phone number",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 2 || (value && /^[0-9]{10}$/.test(value));
      }
    ),
    name3: yup.string().test(
      "required-player3-name",
      "Enter a name for Player 3",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 3 || !!value;
      }
    ),
    phone3: yup.string().test(
      "required-player3-phone",
      "Enter a 10 digit phone number",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 3 || (value && /^[0-9]{10}$/.test(value));
      }
    ),
    name4: yup.string().test(
      "required-player4-name",
      "Enter a name for Player 4",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 4 || !!value;
      }
    ),
    phone4: yup.string().test(
      "required-player4-phone",
      "Enter a 10 digit phone number",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 4 || (value && /^[0-9]{10}$/.test(value));
      }
    ),
    NumberOfPlayers: yup.string().required("Number of Agents is required"),
    NoStairs: yup.boolean(),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "Agree to the terms and conditions to proceed"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      name1: "",
      phone1: "",
      name2: "",
      phone2: "",
      name3: "",
      phone3: "",
      name4: "",
      phone4: "",
      NumberOfPlayers: "1",
      NoStairs: false,
      agreeToTerms: false,
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitted values:", values);

      fetch("https://hook.us1.make.com/ez1uff29nk2ooouwswslke2zk63b6w4j", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          console.log("successful response", res);
          history.push("/confirmed#top");
        } else {
          res.json().then((error) => {
            console.error(error.error);
            alert(`Error: ${error.message}`);
          });
        }
      });
    },
  });
  console.log("Form Values:", formik.values);

  useEffect(() => {
    const { firstName, lastName } = formik.values;
    if (firstName || lastName) {
      formik.setFieldValue("name1", `${firstName} ${lastName}`.trim());
    }
    // eslint-disable-next-line
  }, [formik.values.firstName, formik.values.lastName]);

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 10);
    let formatted = part1;
    if (part2) formatted += '-' + part2;
    if (part3) formatted += '-' + part3;
    return formatted;
  };
  
  const handleFormattedPhoneChange = (fieldName, formik) => (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (raw.length <= 10) {
      formik.setFieldValue(fieldName, raw);
    }
  };

  return (
    <div className="pageContent">
      <title>Start Mission | Spies Among Us</title>

      {/* <div className="start-header">Welcome, Agent.</div>
      <div className="start-subheader">We have a mission for you.</div>
      <div className="start-subsubheader">
        <span className="rogueSpy">A ROGUE SPY</span> is currently roaming the
        area. Use your phone and wits to uncover clues, reveal their plot, and
        deduce their whereabouts. Adventure and danger will be hiding from you
        in plain sight!
      </div> */}
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
        <h3 style={{ color: "#ff3700" }}> {formik.errors.firstName}</h3>

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
        <h3 style={{ color: "#ff3700" }}> {formik.errors.lastName}</h3>

        <label htmlFor="phone1">Phone</label>
        <br />
        <input
          type="tel"
          name="phone1"
          className="formField"
          value={formatPhone(formik.values.phone1)}
          onChange={handleFormattedPhoneChange('phone1', formik)}
        />
        <br />
        <h3 style={{ color: "#ff3700" }}> {formik.errors.phone1}</h3>

        <label htmlFor="NumberOfPlayers">Number of agents on your mission</label>
        <br />
        <select
          name="NumberOfPlayers"
          id="NumberOfPlayers"
          className="formField"
          value={formik.values.NumberOfPlayers}
          onChange={formik.handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <br />
        <br />

        <span className="secondAgentText" style={{"fontWeight":"normal", "fontSize":"5vw"}}>
          Other agents will receive all the texts and clues you receive, but you will be responsible for replying to texts.
        </span>
        <br />
        <br />

        {formik.values.NumberOfPlayers >= "2" && (
          <div id="name2">
            <label htmlFor="name2">2nd Agent's Name</label>
            <br />
            <input
              type="text"
              name="name2"
              className="formField"
              value={formik.values.name2}
              onChange={formik.handleChange}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#ff3700" }}> {formik.errors.name2}</h3>

        {formik.values.NumberOfPlayers >= "2" && (
          <div id="phone2">
            <label htmlFor="phone2">2nd Agent's Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone2"
              className="formField"
              value={formatPhone(formik.values.phone2)}
              onChange={handleFormattedPhoneChange('phone2', formik)}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#ff3700" }}> {formik.errors.phone2}</h3>

        {formik.values.NumberOfPlayers >= "3" && (
          <div id="name3">
            <label htmlFor="name3">3rd Agent's Name</label>
            <br />
            <input
              type="text"
              name="name3"
              className="formField"
              value={formik.values.name3}
              onChange={formik.handleChange}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#ff3700" }}> {formik.errors.name3}</h3>

        {formik.values.NumberOfPlayers >= "3" && (
          <div id="phone3">
            <label htmlFor="phone3">3rd Agent's Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone3"
              className="formField"
              value={formatPhone(formik.values.phone3)}
              onChange={handleFormattedPhoneChange('phone3', formik)}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#ff3700" }}> {formik.errors.phone3}</h3>
        
        {formik.values.NumberOfPlayers >= "4" && (
          <div id="name4">
            <label htmlFor="name4">4th Agent's Name</label>
            <br />
            <input
              type="text"
              name="name4"
              className="formField"
              value={formik.values.name4}
              onChange={formik.handleChange}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#ff3700" }}> {formik.errors.name4}</h3>

        {formik.values.NumberOfPlayers >= "4" && (
          <div id="phone4">
            <label htmlFor="phone4">4th Agent's Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone4"
              className="formField"
              value={formatPhone(formik.values.phone4)}
              onChange={handleFormattedPhoneChange('phone4', formik)}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#ff3700" }}> {formik.errors.phone4}</h3>

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
          <h3 style={{ color: "#ff3700" }}> {formik.errors.agreeToTerms}</h3>
        </label>

        <label>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <input
              type="checkbox"
              name="NoStairs"
              checked={formik.values.NoStairs}
              onChange={formik.handleChange}
            />
            <span className="checkbox"></span>
            <span className="checkboxLabel">
              I do not want to go up any stairs this mission.
            </span>
          </div>
          <h3 style={{ color: "#ff3700" }}> {formik.errors.NoStairs}</h3>
        </label>

        <br />
        <br />
        <input type="submit" value="Begin Mission" className="submitButton" />
        {/* {error&& <h3 style={{color:'#ff3700'}}> {error}</h3>} */}
      </form>
    </div>
  );
}

export default Begin; 

