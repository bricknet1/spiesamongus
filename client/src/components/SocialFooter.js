import instagram from "../assets/pictures/instagram.webp";
import facebook from "../assets/pictures/facebook.webp";

function SocialFooter() {
  return (
    <div style={{ fontSize: "5vw", textAlign: "center", marginTop: "30vw" }}>
      <a
        href="https://www.instagram.com/spiesamong"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={instagram}
          alt="Instagram"
          style={{ width: "10vw", marginBottom: "0", paddingBottom: "0" }}
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
          style={{ width: "10vw", marginBottom: "0", paddingBottom: "0" }}
        ></img>
      </a>
      <div style={{ fontWeight: "normal" }}>2024 Interactive Escapes</div>
    </div>
  );
}

export default SocialFooter;
