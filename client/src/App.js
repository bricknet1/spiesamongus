import "./App.css";
import { Route, Switch } from "react-router-dom";

import Start from "./components/Start.js";

function App() {
  return (
    <div className="App">
      Main page is displaying.
      <Switch>
        <Route path="/start" exact>
          <Start />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
