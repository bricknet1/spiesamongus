import VisitedPagesMenu from "./VisitedPagesMenu.js";

function ObeliskTerms() {
  return (
    <div style={{ backgroundColor: "black", paddingBottom: "20vw" }}>
      <title>Obelisk Terms</title>
      <VisitedPagesMenu />

      <div className="yellowBar">OBELISK TERMS & CONDITIONS</div>

      <div className="termsContainer">
        <div className="termsHeading">
          Participant Agreement and Release of Liability Waiver
        </div>

        <ol>
          <li className="termsOL">Data Sharing</li>
          <ul>
            <li className="termsUL">
              By placing your hands on the Obelisk, you agree to share all your
              data with the Obelisk.
            </li>
          </ul>

          <li className="termsOL">Power of Attorney</li>
          <ul>
            <li className="termsUL">
              You agree the power of a measly attorney is nothing compared to
              the power of an all-knowing obelisk (with a law degree).
            </li>
          </ul>

          <li className="termsOL">Responsible Behavior</li>
          <ul>
            <li className="termsUL">
              You acknowledge that the Obelisk appreciates:
              <ul>
                <li>Being bowed to</li>
                <li>Compliments</li>
                <li>Animal sacrifices (no cloven hooves!)</li>
                <li>Being embraced</li>
              </ul>
            </li>
          </ul>

          <li className="termsOL">Release of Liability</li>
          <ul>
            <li className="termsUL">
              You agree to help Liability, the Obelisk's niece, escape from
              silver statue prison
            </li>
          </ul>

          <li className="termsOL">Washington Monument</li>
          <ul>
            <li className="termsUL">
              You condemn that the Washington Monument was picked to star in
              Spiderman: Homecoming when the Obelisk would have done a superior
              job.
            </li>
          </ul>

          {/* <li className='termsOL'>Opt Out</li>
          <ul>
            <li className='termsUL'>You may opt out of this waiver by texting Papyrus's phone number with the opt out phrase "No way, Jose."</li>
            <li className='termsUL'>You must do this before placing your hands on the Obelisk.</li>
          </ul> */}
        </ol>
      </div>
    </div>
  );
}

export default ObeliskTerms;
