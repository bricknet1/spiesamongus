import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function Bypass() {
  const history = useHistory();

  const formSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phone1: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    name2: yup.string().test(
      "required-player2-name",
      "Name for player 2 is required",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 2 || !!value;
      }
    ),
    phone2: yup.string().test(
      "required-player2-phone",
      "Phone for player 2 required & must be 10 digits",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 2 || (value && /^[0-9]{10}$/.test(value));
      }
    ),
    name3: yup.string().test(
      "required-player3-name",
      "Name for player 3 is required",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 3 || !!value;
      }
    ),
    phone3: yup.string().test(
      "required-player3-phone",
      "Phone for player 3 required & must be 10 digits",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 3 || (value && /^[0-9]{10}$/.test(value));
      }
    ),
    name4: yup.string().test(
      "required-player4-name",
      "Name for player 4 is required",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 4 || !!value;
      }
    ),
    phone4: yup.string().test(
      "required-player4-phone",
      "Phone for player 4 required & must be 10 digits",
      function (value) {
        const { NumberOfPlayers } = this.parent;
        return parseInt(NumberOfPlayers || "0") < 4 || (value && /^[0-9]{10}$/.test(value));
      }
    ),
    NumberOfPlayers: yup.string().required("Number of Agents is required"),
    NoStairs: yup.boolean(),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "Agreeing to the terms and conditions is required"),
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
      act: "1",
      NoStairs: false,
      agreeToTerms: false,
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitted values:", values);

      fetch("NEED WEBHOOK HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          console.log("successful response", res);
          history.push("/confirmed");
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

  return (
    <div className="pageContent" style={{ paddingBottom: "10vw" }}>
      <title>Bypass | Spies Among Us</title>

      <div className="orangeBar">MISSION BYPASS</div>

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

        <label htmlFor="phone1">Phone</label>
        <br />
        <input
          type="tel"
          name="phone1"
          className="formField"
          value={formik.values.phone1}
          onChange={formik.handleChange}
        />
        <br />
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.phone1}</h3>

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

        <span className="secondAgentText">
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
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.name2}</h3>

        {formik.values.NumberOfPlayers >= "2" && (
          <div id="phone2">
            <label htmlFor="phone2">2nd Agent's Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone2"
              className="formField"
              value={formik.values.phone2}
              onChange={formik.handleChange}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.phone2}</h3>

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
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.name3}</h3>

        {formik.values.NumberOfPlayers >= "3" && (
          <div id="phone3">
            <label htmlFor="phone3">3rd Agent's Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone3"
              className="formField"
              value={formik.values.phone3}
              onChange={formik.handleChange}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.phone3}</h3>
        
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
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.name4}</h3>

        {formik.values.NumberOfPlayers >= "4" && (
          <div id="phone4">
            <label htmlFor="phone4">4th Agent's Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone4"
              className="formField"
              value={formik.values.phone4}
              onChange={formik.handleChange}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#4FC9C2" }}> {formik.errors.phone4}</h3>

        <label htmlFor="act">Jump to later act?</label><br/>
        <label htmlFor="act">(Leave at 1 if starting from beginning)</label>
        <br />
        <select
          name="act"
          id="act"
          className="formField"
          value={formik.values.act}
          onChange={formik.handleChange}
        >
          <option value="1">Act 1 (Mission Start)</option>
          <option value="2">Act 2 (Papyrus Call)</option>
          <option value="4">Act 4 (Hashimoto)</option>
          <option value="5">Act 5 (Marble Search)</option>
          <option value="6">Act 6 (Friendship Knot)</option>
          <option value="7.1">Act 7 (Obelisk)</option>
          <option value="7.2">Act 7 (Sweat Yoga)</option>
          <option value="8">Act 8 (Black)</option>
          <option value="10">Act 10 (White)</option>
        </select>
        <br />
        <br />

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
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.NoStairs}</h3>
        </label>

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
      </form>

    </div>
  );
}

export default Bypass;