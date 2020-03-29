import React, { Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "../../Login/react-auth0-spa";
import "./App.scss";
import Header from "../Header";
import Home from "../Home";
import history from "../../Login/utils/history";

const Projects = React.lazy(() => import("../Projects"));
const Contact = React.lazy(() => import("../Contact"));
const HowTo = React.lazy(() => import("../HowTo"));
const Profile = React.lazy(() => import("../Profile"));
const PrivateRoute = React.lazy(() => import("../PrivateRoute"));
const PageNotFound = React.lazy(() => import("../PageNotFound"));

// const Projects = React.lazy(() => import("../Projects"));
function App() {
  const { loading } = useAuth0();
  const PATH = "/";
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app">
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Switch>
            <Route path={`${PATH}`} exact component={Home} />
            <Route path={`${PATH}projects`} component={Projects} />
            <Route path={`${PATH}contact`} component={Contact} />
            <Route path={`${PATH}how-to`} component={HowTo} />
            <PrivateRoute path={`${PATH}profile`} component={Profile} />
            <Route path={`${PATH}`} component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
