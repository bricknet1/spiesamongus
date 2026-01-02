import * as yup from "yup";
import { useFormik } from "formik";
import { useState, useRef } from "react";

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

      // Format phone with +1 prefix for API
      const formatPhone = (phone) => {
        if (!phone) return "";
        const digits = phone.replace(/\D/g, "");
        return digits.length === 10 ? `+1${digits}` : phone;
      };

      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

      // Prepare data for DELETE endpoint
      const deleteData = {
        phone: formatPhone(values.phone),
      };

      // Call both endpoints
      const makeWebhookPromise = fetch(
        "https://hook.us1.make.com/7v75ikxoeoo61lykx6776cv3au0fc5op",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: values }),
        }
      );

      const deleteWebhookPromise = fetch(
        `${API_URL}/api/webhook/player-progress`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deleteData),
        }
      );

      // Wait for both requests (don't fail if DELETE webhook fails)
      Promise.allSettled([makeWebhookPromise, deleteWebhookPromise]).then(
        (results) => {
          const makeResult = results[0];
          const deleteResult = results[1];

          // Log DELETE webhook result (but don't block on it)
          if (deleteResult.status === "fulfilled") {
            deleteResult.value
              .json()
              .then((data) => {
                console.log("DELETE webhook response:", data);
              })
              .catch((err) => {
                console.warn("DELETE webhook error (non-blocking):", err);
              });
          } else {
            console.warn(
              "DELETE webhook failed (non-blocking):",
              deleteResult.reason
            );
          }

          // Only check Make webhook for success/failure
          if (makeResult.status === "fulfilled" && makeResult.value.ok) {
            console.log("successful response", makeResult.value);
            setCancelled(true);
          } else {
            const errorMsg =
              makeResult.status === "fulfilled"
                ? "Make webhook error"
                : makeResult.reason?.message || "Unknown error";
            console.error(errorMsg);
          }
        }
      );
    },
  });
  console.log("Form Values:", formik.values);

  const phoneInputRef = useRef(null);

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

  const handlePhoneChange = (e) => {
    const input = e.target;
    const inputValue = input.value;
    const cursorPos = input.selectionStart;

    // Get old values
    const oldFormatted = formatPhone(formik.values.phone || "");
    const oldDigits = (formik.values.phone || "").replace(/\D/g, "");

    // Extract only digits and limit to 10
    const digitsOnly = inputValue.replace(/\D/g, "").slice(0, 10);

    // Determine if this is a deletion
    const isDeletion = digitsOnly.length < oldDigits.length;

    // Count digits in the browser's input value up to cursor position
    // This tells us where the cursor actually is after the browser's insertion/deletion
    const digitsAtCursorInInput = inputValue
      .slice(0, cursorPos)
      .replace(/\D/g, "").length;

    // Update the value
    formik.setFieldValue("phone", digitsOnly);

    // Restore cursor position after React re-renders
    setTimeout(() => {
      const inputElement = phoneInputRef.current || input;
      if (inputElement) {
        const newFormatted = formatPhone(digitsOnly);

        // Use the digit count from the browser's input value
        // This accurately reflects where the cursor should be
        const targetDigitCount = digitsAtCursorInInput;

        // Find position in formatted string with target number of digits before it
        let digitCount = 0;
        let newCursorPos = newFormatted.length;
        for (let i = 0; i < newFormatted.length; i++) {
          if (/\d/.test(newFormatted[i])) {
            digitCount++;
            if (digitCount === targetDigitCount) {
              newCursorPos = i + 1;
              break;
            }
          }
        }

        inputElement.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

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
            value={formatPhone(formik.values.phone)}
            onChange={handlePhoneChange}
            ref={phoneInputRef}
          />
          <br />
          <h3 style={{ color: "#ff3700" }}> {formik.errors.phone}</h3>
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
