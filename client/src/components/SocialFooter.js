import instagram from "../assets/pictures/instagram.webp";
import facebook from "../assets/pictures/facebook.webp";
import useDeviceType from "./UseDeviceType.js";

function SocialFooter() {

  const isMobile = useDeviceType();

  const footerStyle = {
    fontSize: isMobile ? "5vw" : "18px",
    textAlign: "center",
    marginTop: isMobile ? "30vw" : "150px",
    marginBottom: isMobile ? "" : "20px",
    fontWeight: "normal"
  };

  const iconStyle = {
    width: isMobile ? "10vw" : "28px",
    marginBottom: "0",
    paddingBottom: "0"
  };

  return (
    <div style={footerStyle}>
      <a
        href="https://www.instagram.com/spiesamong"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={instagram}
          alt="Instagram"
          style={iconStyle}
        ></img>
      </a>
      <a
        href="https://www.facebook.com/spiesamong"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={facebook}
          alt="Facebook"
          style={iconStyle}
        ></img>
      </a>
      <div>2025 Interactive Escapes</div>
    </div>
  );
}

export default SocialFooter;
