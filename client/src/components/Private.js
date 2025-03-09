import HamburgerMenuHeader from "./HamburgerMenuHeader.js";
import Questions from "./Questions.js";
import SocialFooter from "./SocialFooter.js";
import useDeviceType from "./UseDeviceType.js";
import posterPic from "../assets/pictures/Private Events Poster.jpg";

import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Private() {
  const history = useHistory();

  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  useEffect(() => {
    if (submissionSuccess === true) {
      history.push("/private#submission")
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [submissionSuccess, history]);

  const formSchema = yup.object().shape({
    firstName: yup.string().required("⬆️ First name is required"),
    lastName: yup.string().required("⬆️ Last name is required"),
    email: yup
      .string()
      .email("⬆️ Must be a valid email")
      .required("⬆️ Email is required"),
    phone: yup
      .string()
      .matches(
        /^\d{3}-\d{3}-\d{4}$/,
        '⬆️ Phone must be in the format "xxx-xxx-xxxx"'
      ),
    company: yup.string(),
    numberOfGuests: yup.string(),
    date: yup.string(),
    time: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      numberOfGuests: "",
      date: "",
      time: "",
      otherInfo: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log("Submitted values:", values);

      try {
        const res = await fetch(
          "https://hook.us1.make.com/ie51ehdz8927mgurx1ox6lxznqh4gb9p",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (res.ok) {
          console.log("Form successfully submitted");
          setSubmissionSuccess(true);
          history.push('/privateconfirmed#top')
        } else {
          console.error("Submission failed");
          setSubmissionSuccess(false);
        }
      } catch (error) {
        console.error("Network error:", error);
        setSubmissionSuccess(false);
      }
    },
  });
  console.log("Form Values:", formik.values);

  function SubmissionMessage() {
    return (
      <>
        <br />
        {submissionSuccess === true && (
          <div style={submissionMessageStyle} id="submission">
            <br />
            <br />
            Submission received! We will be in touch soon. Please check your
            spam folder as emails often end up there!
          </div>
        )}
        {submissionSuccess === false && (
          <div style={submissionMessageStyle} id="submission">
            Submission failed! Please refresh the page and try again!
          </div>
        )}
      </>
    );
  }

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");

    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6, 10)}`;
    }

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    formik.setFieldValue("phone", formattedPhone);
  };

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
    color: "white",
    fontSize: isMobile ? "8vw" : "30px",
    paddingBottom: "20px",
  };

  const errorStyle = {
    color: "#DF3131",
    fontSize: isMobile ? "" : "20px",
    height: isMobile ? "" : "25px",
  };

  return (
    <div>
      <div className="pageContent" style={pageContentStyle} id="top">
        <title>Private Events | Spies Among Us</title>

        <HamburgerMenuHeader />

        <img src={posterPic} style={posterStyle} alt="Private Events" />

        <br />
        <br />
        {submissionSuccess !== true ? (
          <>
            <div style={mainStyle}>
              <div style={headingStyle}>HOW IT WORKS</div>
              <ul className="privateEventsList">
                <li className={listItemStyle}>
                  Tell us what day and time you would like your group event.
                </li>
                <li className={listItemStyle}>
                  Pick a meeting spot in Little Tokyo (bar, hotel,
                  restaurant...)
                </li>
                <li className={listItemStyle}>
                  On the day of your event, we will send your participants
                  through the Spies experience in groups of four every 5
                  minutes.
                </li>
                <li className={listItemStyle}>
                  As each group finishes the experience, they will receive a
                  final text leading them to the meeting place to debrief and
                  celebrate!
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
                    isMobile
                      ? "privatePageLabelMobile"
                      : "privatePageLabelDesktop"
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
                    isMobile
                      ? "privatePageLabelMobile"
                      : "privatePageLabelDesktop"
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
                    isMobile
                      ? "privatePageLabelMobile"
                      : "privatePageLabelDesktop"
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
                    isMobile
                      ? "privatePageLabelMobile"
                      : "privatePageLabelDesktop"
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
                  onChange={handlePhoneChange}
                />
                <br />
                <div style={errorStyle}> {formik.errors.phone}</div>

                <label
                  htmlFor="company"
                  className={
                    isMobile
                      ? "privatePageLabelMobile"
                      : "privatePageLabelDesktop"
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
                    isMobile
                      ? "privatePageLabelMobile"
                      : "privatePageLabelDesktop"
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
                <div style={errorStyle}> {formik.errors.numberOfGuests}</div>

                <label
                  htmlFor="date"
                  className={
                    isMobile
                      ? "privatePageLabelMobile"
                      : "privatePageLabelDesktop"
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
                    isMobile
                      ? "privatePageLabelMobile"
                      : "privatePageLabelDesktop"
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
                    isMobile
                      ? "privatePageLabelMobile"
                      : "privatePageLabelDesktop"
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

                <br />
              </form>
            </div>
          </>
        ) : null}

        <SubmissionMessage />

        <br />
        <br />
      </div>
      <Questions />
      <SocialFooter />
    </div>
  );
}

export default Private;
