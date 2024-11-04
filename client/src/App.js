import { Route, Switch } from "react-router-dom";

import Start from "./components/Start.js";
import Opbc from "./components/Opbc.js";
import Myprofile from "./components/Myprofile.js";

function App() {
  return (
    <div className="App">

      {/* MISSION PAGES */}
      <Switch>
        <Route path="/start" exact>
          <Start />
        </Route>
        {/* <Route path="/confirmed" exact>
          <Confirmed />
        </Route> */}
        {/* <Route path="/mission" exact>
          <Mission />
        </Route> */}
        {/* <Route path="/yourmission" exact>
          <Yourmission />
        </Route> */}
        {/* <Route path="/themission" exact>
          <Themission />
        </Route> */}
        <Route path="/myprofile" exact>
          <Myprofile />
        </Route>
        {/* <Route path="/myhistory" exact>
          <Myhistory />
        </Route> */}
        {/* <Route path="/marble" exact>
          <Marble />
        </Route> */}
        {/* <Route path="/yourupdatedmission" exact>
          <Yourupdatedmission />
        </Route> */}
        <Route path="/opbc" exact>
          <Opbc />
        </Route>
        {/* <Route path="/debrief" exact>
          <Debrief />
        </Route> */}

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
        {/* <Route path="/privacy" exact>
          <Privacy />
        </Route> */}
        {/* <Route path="/terms" exact>
          <Terms />
        </Route> */}
        {/* <Route path="/payment" exact>
          <Payment />
        </Route> */}
        {/* <Route path="/private" exact>
          <Private />
        </Route> */}

      </Switch>
    </div>
  );
}

export default App;
