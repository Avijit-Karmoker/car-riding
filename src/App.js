import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Destination from "./components/Destination/Destination";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "../src/images/Bg.jpg";
import DestinationDetails from "./components/DestinationDetails/DestinationDetails";
import NoMatch from "./components/NoMatch/NoMatch";
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/destination">
              <Destination />
            </PrivateRoute>
            <PrivateRoute path="/destinationDetails">
              <DestinationDetails />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
