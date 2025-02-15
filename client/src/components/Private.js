import Questions from "./Questions.js";
import SocialFooter from "./SocialFooter.js";
import posterPic from "../assets/pictures/Private Events Poster.jpg";

import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

function Private() {
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
      .matches(
        /^\+1\d{10}$/,
        'Phone number must start with "+1" followed by exactly 10 digits'
      ),
    company: yup.string().required("Company name or Reason is required"),
    numberOfGuests: yup.string().required("Number of Guests is required"),
    date: yup.string().required("Date is required"),
    time: yup.string().required("Time is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "+1",
      company: "",
      numberOfGuests: "",
      date: "",
      time: "",
      otherInfo: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitted values:", values);

      fetch("https://hook.us1.make.com/ie51ehdz8927mgurx1ox6lxznqh4gb9p", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then(setSubmissionSuccess(true));
        } else {
          res.json().then((error) => {
            console.log(error);
          });
          setSubmissionSuccess(false);
        }
      });
    },
  });
  console.log("Form Values:", formik.values);

  const [submittionSuccess, setSubmissionSuccess] = useState("");

  function SubmissionMessage() {
    return (
      <>
      <br />
        {submittionSuccess === true && (
          <div style={{ color: "black", fontSize: "8vw" }}>
            Submission received! We will be in touch soon. Please check your
            spam folder as emails often end up there!
          </div>
        )}
        {submittionSuccess === false && (
          <div style={{ color: "black", fontSize: "8vw" }}>
            Submission failed! Please refresh the page and try again!
          </div>
        )}
      </>
    );
  }

  return (
    <div className="pageContent" style={{ paddingBottom: "10vw" }}>
      <title>Private Events | Spies Among Us</title>
      add menu header here
      <img src={posterPic} style={{ width: "100vw" }} alt="Private Events" />
      <div
        style={{
          alignContent: "center",
          textAlign: "center",
          display: "block",
          margin: "0 auto",
          width: "90vw",
        }}
      >
        <br />
        <br />
        <br />
        <div style={{ fontSize: "8vw" }}>HOW IT WORKS</div>
        <ul className="privateEventsList">
          <li className="privateEventsListItem">
            Tell us what day and time you would like your group event.
          </li>
          <li className="privateEventsListItem">
            Pick a meeting spot in Little Tokyo (bar, hotel, restaurant...)
          </li>
          <li className="privateEventsListItem">
            On the day of your event, we will send your participants through the
            Spies experience in groups of four every 5 minutes.
          </li>
          <li className="privateEventsListItem">
            As each group finishes the experience, they will receive a final
            text leading them to the meeting place to debrief and celebrate!
          </li>
        </ul>
        <br />
        <br />
      </div>
      <div className="orangeLine" />
      <div
        style={{
          alignContent: "center",
          textAlign: "center",
          display: "block",
          margin: "0 auto",
          width: "90vw",
        }}
      >
        <br />
        <br />
        <div style={{ fontSize: "8vw" }}>
          Fill out this form to learn more and receive a quote!
        </div>
        <br />
        <br />

        <form onSubmit={formik.handleSubmit} className="privatePageForm">
          <label htmlFor="firstName" className="privatePageLabel">
            First name *
          </label>
          <br />
          <input
            type="text"
            name="firstName"
            className="privatePageFormField"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <br />
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.firstName}</h3>

          <label htmlFor="lastName" className="privatePageLabel">
            Last name *
          </label>
          <br />
          <input
            type="text"
            name="lastName"
            className="privatePageFormField"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          <br />
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.lastName}</h3>

          <label htmlFor="email" className="privatePageLabel">
            Email *
          </label>
          <br />
          <input
            type="text"
            name="email"
            className="privatePageFormField"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <br />
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.email}</h3>

          <label htmlFor="phone" className="privatePageLabel">
            Phone
          </label>
          <br />
          <input
            type="tel"
            name="phone"
            className="privatePageFormField"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          <br />
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.phone}</h3>

          <label htmlFor="company" className="privatePageLabel">
            Company name or reason for event
          </label>
          <br />
          <input
            type="text"
            name="company"
            className="privatePageFormField"
            value={formik.values.company}
            onChange={formik.handleChange}
          />
          <br />
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.company}</h3>

          <label htmlFor="numberOfGuests" className="privatePageLabel">
            Rough number of guests you are expecting
          </label>
          <br />
          <input
            type="text"
            name="numberOfGuests"
            className="privatePageFormField"
            value={formik.values.numberOfGuests}
            onChange={formik.handleChange}
          />
          <br />
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.numberOfGuests}</h3>

          <label htmlFor="date" className="privatePageLabel">
            Date you are considering for the event
          </label>
          <br />
          <input
            type="text"
            name="date"
            className="privatePageFormField"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          <br />
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.date}</h3>

          <label htmlFor="time" className="privatePageLabel">
            Time you are considering for the event
          </label>
          <br />
          <input
            type="text"
            name="time"
            className="privatePageFormField"
            value={formik.values.time}
            onChange={formik.handleChange}
          />
          <br />
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.time}</h3>

          <label htmlFor="otherInfo" className="privatePageLabel">
            Anything else we should know?
          </label>
          <br />
          <textarea
            type="text"
            name="otherInfo"
            className="privatePageFormFieldLarge"
            value={formik.values.otherInfo}
            onChange={formik.handleChange}
          />
          <br />
          <h3 style={{ color: "#4FC9C2" }}> {formik.errors.otherInfo}</h3>

          <br />
          <input
            type="submit"
            value="Submit"
            className="privatePageSubmitButton"
          />
          {/* {error&& <h3 style={{color:'#4FC9C2'}}> {error}</h3>} */}

          <SubmissionMessage />
        </form>

        <br />
        <br />
      </div>
      <Questions />
      <SocialFooter />
    </div>
  );
}

export default Private;

// DATA STRUCTURE FOR FORM SUBMISSION
// POST CALL TO https://www.spiesamong.us/_api/form-submission-service/v4/submissions

// {
//   "submission": {
//       "formId": "ce857fdb-3d2b-4b02-ac09-dfa8f6a579f7",
//       "submissions": {
//           "first_name_14d6": "Nick",
//           "last_name_923c": "Johnson",
//           "email_aa8e": "nlj222@gmail.com",
//           "phone_65f9": "+15853299321",
//           "company_name_or_reason_for_event": "TESTING - company name here",
//           "date_you_are_considering_for_the_event": "2024-12-31",
//           "time_you_are_considering_for_the_event": "13:51:00",
//           "anything_else_we_should_know": "TESTING FORM - Sorry Prescott! Just testing!",
//           "rough_number_of_guests_you_are_expecting": 69420
//       },
//       "status": "PENDING"
//   }
// }

// When submitted successfully, make this appear under the submit button: Submission received! We will be in touch soon. Please check your spam folder as emails often end up there!
