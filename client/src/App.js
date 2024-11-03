import { Route, Switch } from "react-router-dom";

import Start from "./components/Start.js";
import Opbc from "./components/Opbc.js";
import Myprofile from "./components/Myprofile.js";

function App() {
  return (
    <div className="App">
      {/* Main page is displaying. */}
      <Switch>
        <Route path="/start" exact>
          <Start />
        </Route>
        <Route path="/opbc" exact>
          <Opbc />
        </Route>
        <Route path="/Myprofile" exact>
          <Myprofile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
