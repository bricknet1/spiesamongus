import SocialFooter from "./SocialFooter.js";
import VisitedPagesMenu from "./VisitedPagesMenu.js";

function NotFound() {
  return (
    <div
      className="pageContent"
      style={{
        fontSize: "10vw",
        margin: "0 auto",
        width: "90vw",
        textAlign: "center",
      }}
    >
      <title>Spies Among Us</title>
      <VisitedPagesMenu />
      <br />
      THERE'S NOTHING HERE AGENT...
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <SocialFooter />
    </div>
  );
}

export default NotFound;
