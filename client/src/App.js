import { Route, Switch } from "react-router-dom";

import Confirmed from "./components/Confirmed.js";
import Debrief from "./components/Debrief.js";
import Marble from "./components/Marble.js";
import Mission from "./components/Mission.js";
import Myhistory from "./components/Myhistory.js";
import Myprofile from "./components/Myprofile.js";
import NotFound from "./components/NotFound.js";
import ObeliskTerms from "./components/ObeliskTerms.js";
import Opbc from "./components/Opbc.js";
import Payment from "./components/Payment.js";
import Privacy from "./components/Privacy.js";
import Private from "./components/Private.js";
import Start from "./components/Start.js";
import Terms from "./components/Terms.js";
import TheMission from "./components/TheMission.js";
import YourMission from "./components/YourMission.js";
import YourUpdatedMission from "./components/YourUpdatedMission.js";

function App() {
  return (
    <div className="App">

      {/* MISSION PAGES */}
      <Switch>
        <Route path="/start" exact>
          <Start />
        </Route>
        <Route path="/confirmed" exact>
          <Confirmed />
        </Route>
        <Route path="/mission" exact>
          <Mission />
        </Route>
        <Route path="/yourmission" exact>
          <YourMission />
        </Route>
        <Route path="/themission" exact>
          <TheMission />
        </Route>
        <Route path="/myprofile" exact>
          <Myprofile />
        </Route>
        <Route path="/myhistory" exact>
          <Myhistory />
        </Route>
        <Route path="/marble" exact>
          <Marble />
        </Route>
        <Route path="/yourupdatedmission" exact>
          <YourUpdatedMission />
        </Route>
        <Route path="/opbc" exact>
          <Opbc />
        </Route>
        <Route path="/obeliskterms" exact>
          <ObeliskTerms />
        </Route>
        <Route path="/debrief" exact>
          <Debrief />
        </Route>

        {/* ADMIN PAGES */}
        {/* <Route path="/bypass" exact>
          <Bypass />
        </Route> */}
        {/* <Route path="/cancel" exact>
          <Cancel />
        </Route> */}

        {/* GENERAL PAGES */}
        <Route path="/" exact>
          <div>MAIN LANDING PAGE</div>
        </Route>
        <Route path="/privacy" exact>
          <Privacy />
        </Route>
        <Route path="/terms" exact>
          <Terms />
        </Route>
        <Route path="/payment" exact>
          <Payment />
        </Route>
        <Route path="/private" exact>
          <Private />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
