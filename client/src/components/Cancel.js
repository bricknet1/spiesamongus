import * as yup from "yup";
import { useFormik } from "formik";
import { useState, useRef } from "react";
import { useSubdomain } from "./SubdomainProvider.js";

function Cancel() {
  const [cancelled, setCancelled] = useState(false);
  const subdomain = useSubdomain();

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
      const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN || "";

      // Determine webhook URL based on subdomain
      const webhookUrl = subdomain === "seattle" 
        ? "https://hook.us2.make.com/4lb7x7sjcvbdinx48qh10myw4ejxc3r6"
        : "https://hook.us1.make.com/7v75ikxoeoo61lykx6776cv3au0fc5op";

      // Prepare data for DELETE endpoint
      const deleteData = {
        phone: formatPhone(values.phone),
      };

      // Call make webhook first
      fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: values }),
      })
        .then((makeResponse) => {
          // Check if make webhook returned 200
          if (makeResponse.status === 200) {
            console.log("Make webhook successful:", makeResponse);
            
            // Only call delete webhook if make webhook returned 200
            return fetch(`${API_URL}/api/webhook/player-progress`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                ...(AUTH_TOKEN && { Authorization: `Bearer ${AUTH_TOKEN}` }),
              },
              body: JSON.stringify(deleteData),
            })
              .then((deleteResponse) => {
                if (deleteResponse.ok) {
                  return deleteResponse.json().then((data) => {
                    console.log("DELETE webhook response:", data);
                    setCancelled(true);
                  });
                } else {
                  console.warn("DELETE webhook returned non-OK status");
                  // Still set cancelled to true since Make webhook succeeded
                  setCancelled(true);
                }
              })
              .catch((err) => {
                console.warn("DELETE webhook error (non-blocking):", err);
                // Still set cancelled to true since Make webhook succeeded
                setCancelled(true);
              });
          } else {
            // Make webhook did not return 200, don't call delete webhook
            throw new Error(
              `Unable to cancel mission, no mission found associated with phone number: ${values.phone}`
            );
          }
        })
        .catch((error) => {
          // Error: make webhook failed or returned non-200
          const errorMsg = error.message || "Unknown error";
          console.error("Make webhook error:", errorMsg);
          alert(`Error: ${errorMsg}`);
        });
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

    // Extract only digits and limit to 10
    const digitsOnly = inputValue.replace(/\D/g, "").slice(0, 10);

    // Count digits in the current input value up to cursor position
    // This represents where the cursor is in the current (browser-modified) input
    const digitsBeforeCursorInInput = inputValue
      .slice(0, cursorPos)
      .replace(/\D/g, "").length;

    // Update the value
    formik.setFieldValue("phone", digitsOnly);

    // Restore cursor position after React re-renders
    // Use double requestAnimationFrame to ensure React has fully updated the DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const inputElement = phoneInputRef.current || input;
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
