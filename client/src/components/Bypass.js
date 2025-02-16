import * as yup from "yup";
import { useFormik } from "formik";

function Bypass() {

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
            });
          }
        });
      },
    });
    console.log("Form Values:", formik.values);

  return (
    <div className="pageContent" style={{ paddingBottom: "10vw" }}>
      <title>Bypass | Spies Among Us</title>

      <div className="orangeBar">MISSION BYPASS</div>

      <div style={{ alignContent: "center", textAlign: "center" }}>
        <br />
        <br />
        <br />
        <div style={{ fontSize: "8vw" }}>
          You will receive a text with instructions shortly.
        </div>
        <br />
        <br />
        <br />


        <br />
        <br />
        <br />
      </div>


    </div>
  );
}

export default Bypass;