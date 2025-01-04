import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

// Lazy load the components
const Confirmed = lazy(() => import("./components/Confirmed"));
const Debrief = lazy(() => import("./components/Debrief"));
const Marble = lazy(() => import("./components/Marble"));
const Mission = lazy(() => import("./components/Mission"));
const Myhistory = lazy(() => import("./components/Myhistory"));
const Myprofile = lazy(() => import("./components/Myprofile"));
const NotFound = lazy(() => import("./components/NotFound"));
const ObeliskTerms = lazy(() => import("./components/ObeliskTerms"));
const Opbc = lazy(() => import("./components/Opbc"));
const Payment = lazy(() => import("./components/Payment"));
const Privacy = lazy(() => import("./components/Privacy"));
const Private = lazy(() => import("./components/Private"));
const Start = lazy(() => import("./components/Start"));
const Terms = lazy(() => import("./components/Terms"));
const TheMission = lazy(() => import("./components/TheMission"));
const YourMission = lazy(() => import("./components/YourMission"));
const YourUpdatedMission = lazy(() => import("./components/YourUpdatedMission"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
