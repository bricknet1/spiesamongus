import HamburgerMenuHeader from "./HamburgerMenuHeader.js";
import Questions from "./Questions.js";
import SocialFooter from "./SocialFooter.js";
import useDeviceType from "./UseDeviceType.js";
import posterPic from "../assets/pictures/Private Events Poster.jpg";

import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

function Private() {
  const formSchema = yup.object().shape({
    firstName: yup.string().required("⬆️ First name is required"),
    lastName: yup.string().required("⬆️ Last name is required"),
    email: yup
      .string()
      .email("⬆️ Must be a valid email")
      .required("⬆️ Email is required"),
    phone: yup
      .string()
      .required("⬆️ Phone is required")
      .matches(
        /^\+1\d{10}$/,
        '⬆️ Phone must start with "+1" followed by 10 digits'
      ),
    company: yup.string().required("⬆️ Company name or Reason is required"),
    numberOfGuests: yup.string().required("⬆️ Number of Guests is required"),
    date: yup.string().required("⬆️ Date is required"),
    time: yup.string().required("⬆️ Time is required"),
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
          <div style={submissionMessageStyle}>
            Submission received! We will be in touch soon. Please check your
            spam folder as emails often end up there!
          </div>
        )}
        {submittionSuccess === false && (
          <div style={submissionMessageStyle}>
            Submission failed! Please refresh the page and try again!
          </div>
        )}
      </>
    );
  }

  const isMobile = useDeviceType();

  const pageContentStyle = {
    paddingBottom: isMobile ? "10vw" : "10px",
    alignContent: "center",
    textAlign: "center",
    display: "block",
    margin: "0 auto",
  };

  const mainStyle = {
    fontSize: isMobile ? "4.5vw" : "18px",
    width: isMobile ? "90vw" : "700px",
    paddingLeft: isMobile ? "5vw" : "",
    lineHeight: isMobile ? "8vw" : "30px",
    margin: isMobile ? "" : "0 auto",
    fontSize: isMobile ? "" : "30px",
  };

  const posterStyle = {
    width: isMobile ? "100vw" : "700px",
  };

  const headingStyle = {
    fontSize: isMobile ? "8vw" : "40px",
    marginTop: isMobile ? "" : "60px",
  };

  const listItemStyle = isMobile
    ? "privateEventsListItemMobile"
    : "privateEventsListItemDesktop";

  const submissionMessageStyle = {
    color: "black",
    fontSize: isMobile ? "8vw" : "30px",
    paddingBottom: "20px",
  };

  const errorStyle = {
    color: "#DF3131",
    fontSize: isMobile ? "" : "20px",
    // lineHeight: "10px"
    height: isMobile ? "" : "25px"
  }

  return (
    <div>
      <div className="pageContent" style={pageContentStyle}>
        <title>Private Events | Spies Among Us</title>

        <HamburgerMenuHeader />

        <img src={posterPic} style={posterStyle} alt="Private Events" />
        <div style={mainStyle}>
          <br />
          <div style={headingStyle}>HOW IT WORKS</div>
          <ul className="privateEventsList">
            <li className={listItemStyle}>
              Tell us what day and time you would like your group event.
            </li>
            <li className={listItemStyle}>
              Pick a meeting spot in Little Tokyo (bar, hotel, restaurant...)
            </li>
            <li className={listItemStyle}>
              On the day of your event, we will send your participants through
              the Spies experience in groups of four every 5 minutes.
            </li>
            <li className={listItemStyle}>
              As each group finishes the experience, they will receive a final
              text leading them to the meeting place to debrief and celebrate!
            </li>
          </ul>
          <br />
          <br />
        </div>
        <div className="orangeLine" />
        <div style={mainStyle}>
          <br />
          <br />
          <div style={headingStyle}>
            Fill out this form to learn more and receive a quote!
          </div>
          <br />
          <br />

          <form
            onSubmit={formik.handleSubmit}
            className={
              isMobile ? "privatePageFormMobile" : "privatePageFormDesktop"
            }
          >
            <label
              htmlFor="firstName"
              className={
                isMobile ? "privatePageLabelMobile" : "privatePageLabelDesktop"
              }
            >
              First name *
            </label>
            <br />
            <input
              type="text"
              name="firstName"
              className={
                isMobile
                  ? "privatePageFormFieldMobile"
                  : "privatePageFormFieldDesktop"
              }
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <br />
            <div style={errorStyle}> {formik.errors.firstName}</div>

            <label
              htmlFor="lastName"
              className={
                isMobile ? "privatePageLabelMobile" : "privatePageLabelDesktop"
              }
            >
              Last name *
            </label>
            <br />
            <input
              type="text"
              name="lastName"
              className={
                isMobile
                  ? "privatePageFormFieldMobile"
                  : "privatePageFormFieldDesktop"
              }
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <br />
            <div style={errorStyle}> {formik.errors.lastName}</div>

            <label
              htmlFor="email"
              className={
                isMobile ? "privatePageLabelMobile" : "privatePageLabelDesktop"
              }
            >
              Email *
            </label>
            <br />
            <input
              type="text"
              name="email"
              className={
                isMobile
                  ? "privatePageFormFieldMobile"
                  : "privatePageFormFieldDesktop"
              }
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <br />
            <div style={errorStyle}> {formik.errors.email}</div>

            <label
              htmlFor="phone"
              className={
                isMobile ? "privatePageLabelMobile" : "privatePageLabelDesktop"
              }
            >
              Phone
            </label>
            <br />
            <input
              type="tel"
              name="phone"
              className={
                isMobile
                  ? "privatePageFormFieldMobile"
                  : "privatePageFormFieldDesktop"
              }
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            <br />
            <div style={errorStyle}> {formik.errors.phone}</div>

            <label
              htmlFor="company"
              className={
                isMobile ? "privatePageLabelMobile" : "privatePageLabelDesktop"
              }
            >
              Company name or reason for event
            </label>
            <br />
            <input
              type="text"
              name="company"
              className={
                isMobile
                  ? "privatePageFormFieldMobile"
                  : "privatePageFormFieldDesktop"
              }
              value={formik.values.company}
              onChange={formik.handleChange}
            />
            <br />
            <div style={errorStyle}> {formik.errors.company}</div>

            <label
              htmlFor="numberOfGuests"
              className={
                isMobile ? "privatePageLabelMobile" : "privatePageLabelDesktop"
              }
            >
              Rough number of guests you are expecting
            </label>
            <br />
            <input
              type="text"
              name="numberOfGuests"
              className={
                isMobile
                  ? "privatePageFormFieldMobile"
                  : "privatePageFormFieldDesktop"
              }
              value={formik.values.numberOfGuests}
              onChange={formik.handleChange}
            />
            <br />
            <div style={errorStyle}>
              {" "}
              {formik.errors.numberOfGuests}
            </div>

            <label
              htmlFor="date"
              className={
                isMobile ? "privatePageLabelMobile" : "privatePageLabelDesktop"
              }
            >
              Date you are considering for the event
            </label>
            <br />
            <input
              type="text"
              name="date"
              className={
                isMobile
                  ? "privatePageFormFieldMobile"
                  : "privatePageFormFieldDesktop"
              }
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <br />
            <div style={errorStyle}> {formik.errors.date}</div>

            <label
              htmlFor="time"
              className={
                isMobile ? "privatePageLabelMobile" : "privatePageLabelDesktop"
              }
            >
              Time you are considering for the event
            </label>
            <br />
            <input
              type="text"
              name="time"
              className={
                isMobile
                  ? "privatePageFormFieldMobile"
                  : "privatePageFormFieldDesktop"
              }
              value={formik.values.time}
              onChange={formik.handleChange}
            />
            <br />
            <div style={errorStyle}> {formik.errors.time}</div>

            <label
              htmlFor="otherInfo"
              className={
                isMobile ? "privatePageLabelMobile" : "privatePageLabelDesktop"
              }
            >
              Anything else we should know?
            </label>
            <br />
            <textarea
              type="text"
              name="otherInfo"
              className={
                isMobile
                  ? "privatePageFormFieldLargeMobile"
                  : "privatePageFormFieldLargeDesktop"
              }
              value={formik.values.otherInfo}
              onChange={formik.handleChange}
            />
            <br />
            <div style={errorStyle}> {formik.errors.otherInfo}</div>

            <input
              type="submit"
              value="Submit"
              className={
                isMobile
                  ? "privatePageSubmitButtonMobile"
                  : "privatePageSubmitButtonDesktop"
              }
            />
            {/* {error&& <div style={{color:'#4FC9C2'}}> {error}</div>} */}

            <SubmissionMessage />
          </form>

          <br />
          <br />
          {isMobile ? null : <br />}
        </div>
      </div>
      <Questions />
      <SocialFooter />
    </div>
  );
}

export default Private;