import React, { useEffect, useState } from "react";
import Homepage from "./Pages/Homepage";
import Authentication from "./Pages/Authentication";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useStateValue } from "./Files/StateProvider";

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  // const [LoggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      {!user ? <Redirect to="/auth"></Redirect> : <Redirect to="/"></Redirect>}
      <div className="app__cont">
        <Switch>
          <Route path="/auth/login">
            <Login />
          </Route>
          <Route path="/auth">
            <Authentication />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
