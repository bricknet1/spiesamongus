import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

function Bypass() {
  const history = useHistory();
  const location = useLocation();
  const prepopulatedData = location.state?.prepopulatedData || null;

  const formSchema = yup.object().shape({
    firstName: yup.string().required("Enter a first name"),
    lastName: yup.string().required("Enter a last name"),
    phone1: yup
      .string()
      .required("Enter a 10 digit phone number")
      .matches(/^[0-9]{10}$/, "Enter a 10 digit phone number")
      .test(
        "unique-phone",
        "Two players can not use the same phone number",
        function (value) {
          const { phone2, phone3, phone4 } = this.parent;
          if (!value) return true;
          return value !== phone2 && value !== phone3 && value !== phone4;
        }
      ),
    name2: yup
      .string()
      .test(
        "required-player2-name",
        "Enter a name for Player 2",
        function (value) {
          const { numberofplayers } = this.parent;
          return parseInt(numberofplayers || "0") < 2 || !!value;
        }
      ),
    phone2: yup
      .string()
      .test(
        "required-player2-phone",
        "Enter a 10 digit phone number",
        function (value) {
          const { numberofplayers } = this.parent;
          return (
            parseInt(numberofplayers || "0") < 2 ||
            (value && /^[0-9]{10}$/.test(value))
          );
        }
      )
      .test(
        "unique-phone",
        "Two players can not use the same phone number",
        function (value) {
          const { numberofplayers, phone1, phone3, phone4 } = this.parent;
          if (parseInt(numberofplayers || "0") < 2 || !value) return true;
          return value !== phone1 && value !== phone3 && value !== phone4;
        }
      ),
    name3: yup
      .string()
      .test(
        "required-player3-name",
        "Enter a name for Player 3",
        function (value) {
          const { numberofplayers } = this.parent;
          return parseInt(numberofplayers || "0") < 3 || !!value;
        }
      ),
    phone3: yup
      .string()
      .test(
        "required-player3-phone",
        "Enter a 10 digit phone number",
        function (value) {
          const { numberofplayers } = this.parent;
          return (
            parseInt(numberofplayers || "0") < 3 ||
            (value && /^[0-9]{10}$/.test(value))
          );
        }
      )
      .test(
        "unique-phone",
        "Two players can not use the same phone number",
        function (value) {
          const { numberofplayers, phone1, phone2, phone4 } = this.parent;
          if (parseInt(numberofplayers || "0") < 3 || !value) return true;
          return value !== phone1 && value !== phone2 && value !== phone4;
        }
      ),
    name4: yup
      .string()
      .test(
        "required-player4-name",
        "Enter a name for Player 4",
        function (value) {
          const { numberofplayers } = this.parent;
          return parseInt(numberofplayers || "0") < 4 || !!value;
        }
      ),
    phone4: yup
      .string()
      .test(
        "required-player4-phone",
        "Enter a 10 digit phone number",
        function (value) {
          const { numberofplayers } = this.parent;
          return (
            parseInt(numberofplayers || "0") < 4 ||
            (value && /^[0-9]{10}$/.test(value))
          );
        }
      )
      .test(
        "unique-phone",
        "Two players can not use the same phone number",
        function (value) {
          const { numberofplayers, phone1, phone2, phone3 } = this.parent;
          if (parseInt(numberofplayers || "0") < 4 || !value) return true;
          return value !== phone1 && value !== phone2 && value !== phone3;
        }
      ),
    numberofplayers: yup.string().required("Number of Agents is required"),
    nostairs: yup.boolean(),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "Agree to the terms and conditions to proceed"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: prepopulatedData?.firstName || "",
      lastName: prepopulatedData?.lastName || "",
      name1: prepopulatedData?.firstName && prepopulatedData?.lastName 
        ? `${prepopulatedData.firstName} ${prepopulatedData.lastName}`.trim()
        : "",
      phone1: prepopulatedData?.phone1 || "",
      name2: prepopulatedData?.name2 || "",
      phone2: prepopulatedData?.phone2 || "",
      name3: prepopulatedData?.name3 || "",
      phone3: prepopulatedData?.phone3 || "",
      name4: prepopulatedData?.name4 || "",
      phone4: prepopulatedData?.phone4 || "",
      numberofplayers: prepopulatedData?.numberofplayers || "1",
      act: prepopulatedData?.act || "Act 1 (Mission Start)",
      nostairs: prepopulatedData?.nostairs || false,
      agreeToTerms: prepopulatedData?.agreeToTerms || false,
      waittime: "0",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitted values:", values);

      // Transform form data to match API format
      const formatPhone = (phone) => {
        if (!phone) return "";
        const digits = phone.replace(/\D/g, "");
        return digits.length === 10 ? `+1${digits}` : phone;
      };

      const apiData = {
        player1_name:
          values.name1 || `${values.firstName} ${values.lastName}`.trim(),
        player1_phone: formatPhone(values.phone1),
        player2_name: values.name2 || "",
        player2_phone: formatPhone(values.phone2),
        player3_name: values.name3 || "",
        player3_phone: formatPhone(values.phone3),
        player4_name: values.name4 || "",
        player4_phone: formatPhone(values.phone4),
        number_of_players: values.numberofplayers,
        current_act: values.act || "Act 1 (Mission Start)",
        texts: [],
      };

      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN || "";

      // Call both endpoints
      const makeWebhookPromise = fetch(
        "https://hook.us1.make.com/b3ulba23rs4f3pbsj99b7ck4623uyzv6",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: values }),
        }
      );

      const apiWebhookPromise = fetch(
        `${API_URL}/api/webhook/player-progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(AUTH_TOKEN && { Authorization: `Bearer ${AUTH_TOKEN}` }),
          },
          body: JSON.stringify(apiData),
        }
      );

      // Wait for both requests (don't fail if API webhook fails)
      Promise.allSettled([makeWebhookPromise, apiWebhookPromise]).then(
        (results) => {
          const makeResult = results[0];
          const apiResult = results[1];

          // Log API webhook result (but don't block on it)
          if (apiResult.status === "fulfilled") {
            apiResult.value
              .json()
              .then((data) => {
                console.log("API webhook response:", data);
              })
              .catch((err) => {
                console.warn("API webhook error (non-blocking):", err);
              });
          } else {
            console.warn(
              "API webhook failed (non-blocking):",
              apiResult.reason
            );
          }

          // Only check Make webhook for success/failure
          if (makeResult.status === "fulfilled" && makeResult.value.ok) {
            console.log("successful response", makeResult.value);
            history.push("/confirmed#top");
          } else {
            const errorMsg =
              makeResult.status === "fulfilled"
                ? "Make webhook error"
                : makeResult.reason?.message || "Unknown error";
            console.error(errorMsg);
            alert(`Error: ${errorMsg}`);
          }
        }
      );
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

  useEffect(() => {
    const num = parseInt(formik.values.numberofplayers || "1");

    const fieldsToClear = [];
    if (num < 4) {
      fieldsToClear.push("name4", "phone4");
    }
    if (num < 3) {
      fieldsToClear.push("name3", "phone3");
    }
    if (num < 2) {
      fieldsToClear.push("name2", "phone2");
    }

    // Only reset fields that have values
    fieldsToClear.forEach((field) => {
      if (formik.values[field] !== "") {
        formik.setFieldValue(field, "");
      }
    });
    // eslint-disable-next-line
  }, [formik.values.numberofplayers]);

  const phoneInputRefs = useRef({});

  const formatPhone = (value) => {
    // Extract only digits
    const digits = (value || "").replace(/\D/g, "");
    // Add dashes after 3rd and 6th digits
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
  };

  const handlePhoneChange = (fieldName) => (e) => {
    const input = e.target;
    const inputValue = input.value;
    const cursorPos = input.selectionStart;

    // Extract only digits and limit to 10
    const digitsOnly = inputValue.replace(/\D/g, "").slice(0, 10);

    // Count digits in the current input value up to cursor position
    // This represents where the cursor is in the current (browser-modified) input
    const digitsBeforeCursorInInput = inputValue
      .slice(0, cursorPos)
      .replace(/\D/g, "").length;

    // Update the value
    formik.setFieldValue(fieldName, digitsOnly);

    // Restore cursor position after React re-renders
    // Use double requestAnimationFrame to ensure React has fully updated the DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const inputElement = phoneInputRefs.current[fieldName] || input;
        if (inputElement) {
          const newFormatted = formatPhone(digitsOnly);

          // The target digit count is based on where the cursor was in the input
          // after the browser's modification
          const targetDigitCount = digitsBeforeCursorInInput;

          // Find position in formatted string with target number of digits before it
          let newCursorPos;
          
          if (targetDigitCount === 0) {
            newCursorPos = 0;
          } else if (targetDigitCount >= digitsOnly.length) {
            // If target is at or beyond the end, place at the end
            newCursorPos = newFormatted.length;
          } else {
            // Find the position after the targetDigitCount-th digit
            let digitCount = 0;
            for (let i = 0; i < newFormatted.length; i++) {
              if (/\d/.test(newFormatted[i])) {
                digitCount++;
                if (digitCount === targetDigitCount) {
                  newCursorPos = i + 1;
                  break;
                }
              }
            }
            // Fallback: if we didn't break (shouldn't happen), place at end
            if (newCursorPos === undefined) {
              newCursorPos = newFormatted.length;
            }
          }

          inputElement.setSelectionRange(newCursorPos, newCursorPos);
        }
      });
    });
  };

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
          onChange={handlePhoneChange("phone1")}
          ref={(el) => (phoneInputRefs.current.phone1 = el)}
        />
        <br />
        <h3 style={{ color: "#ff3700" }}> {formik.errors.phone1}</h3>

        <label htmlFor="numberofplayers">
          Number of agents on your mission
        </label>
        <br />
        <select
          name="numberofplayers"
          id="numberofplayers"
          className="formField"
          value={formik.values.numberofplayers}
          onChange={formik.handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <br />
        <br />

        {/* <span className="secondAgentText">
          Other agents will receive all the texts and clues you receive, but you will be responsible for replying to texts.
        </span>
        <br />
        <br /> */}

        {formik.values.numberofplayers >= "2" && (
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

        {formik.values.numberofplayers >= "2" && (
          <div id="phone2">
            <label htmlFor="phone2">2nd Agent's Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone2"
              className="formField"
              value={formatPhone(formik.values.phone2)}
              onChange={handlePhoneChange("phone2")}
              ref={(el) => (phoneInputRefs.current.phone2 = el)}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#ff3700" }}> {formik.errors.phone2}</h3>

        {formik.values.numberofplayers >= "3" && (
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

        {formik.values.numberofplayers >= "3" && (
          <div id="phone3">
            <label htmlFor="phone3">3rd Agent's Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone3"
              className="formField"
              value={formatPhone(formik.values.phone3)}
              onChange={handlePhoneChange("phone3")}
              ref={(el) => (phoneInputRefs.current.phone3 = el)}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#ff3700" }}> {formik.errors.phone3}</h3>

        {formik.values.numberofplayers >= "4" && (
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

        {formik.values.numberofplayers >= "4" && (
          <div id="phone4">
            <label htmlFor="phone4">4th Agent's Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone4"
              className="formField"
              value={formatPhone(formik.values.phone4)}
              onChange={handlePhoneChange("phone4")}
              ref={(el) => (phoneInputRefs.current.phone4 = el)}
            />
            <br />
          </div>
        )}
        <h3 style={{ color: "#ff3700" }}> {formik.errors.phone4}</h3>

        <label htmlFor="act">Jump to later act?</label>
        <br />
        <label htmlFor="act">(Leave at 1 if starting from beginning)</label>
        <br />
        <select
          name="act"
          id="act"
          className="formField"
          value={formik.values.act}
          onChange={formik.handleChange}
        >
          <option value="Act 1 (Mission Start)">Act 1 (Mission Start)</option>
          <option value="Act 2 (Papyrus Call)">Act 2 (Papyrus Call)</option>
          <option value="Act 4 (Hashimoto)">Act 4 (Hashimoto)</option>
          <option value="Act 5 (Marble Search)">Act 5 (Marble Search)</option>
          <option value="Act 6 (Friendship Knot)">
            Act 6 (Friendship Knot)
          </option>
          <option value="Act 7 (Obelisk)">Act 7 (Obelisk)</option>
          <option value="Act 7 (Sweat Yoga)">Act 7 (Sweat Yoga)</option>
          <option value="Act 8 (Marble)">Act 8 (Marble)</option>
          <option value="Act 10 (Papyrus)">Act 10 (Papyrus)</option>
        </select>
        <br />
        <br />

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
              name="nostairs"
              checked={formik.values.nostairs}
              onChange={formik.handleChange}
            />
            <span className="checkbox"></span>
            <span className="checkboxLabel">
              I do not want to go up any stairs this mission.
            </span>
          </div>
          <h3 style={{ color: "#ff3700" }}> {formik.errors.nostairs}</h3>
        </label>

        <br />
        <br />
        <input type="submit" value="Begin Mission" className="submitButton" />
      </form>
    </div>
  );
}

export default Bypass;
