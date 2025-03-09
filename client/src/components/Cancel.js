import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

function Cancel() {
  const [cancelled, setCancelled] = useState(false);

  const formSchema = yup.object().shape({
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitted values:", values);

      fetch("https://hook.us1.make.com/g5esteyge61iknb9l4livyc9a8li0pmy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          console.log("successful response", res);
          setCancelled(true);
        } else {
          res.json().then((error) => {
            console.error(error.error);
          });
        }
      });
    },
  });
  console.log("Form Values:", formik.values);

  return (
    <div className="pageContent" style={{ paddingBottom: "10vw" }}>
      <title>Cancel Mission | Spies Among Us</title>

      <div className="orangeBar">CANCEL MISSION</div>

      <div style={{ alignContent: "center", textAlign: "center" }}>
        <br />
        <br />
        <div style={{ fontSize: "8vw" }}>
          Enter the phone number of the original agent who signed up:
        </div>
        <form onSubmit={formik.handleSubmit} className="startPageForm">
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
          <br />
          {cancelled ? (
            <h3>Mission Cancelled</h3>
          ) : (
            <input
              type="submit"
              value="Cancel Mission"
              className="submitButton"
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default Cancel;
