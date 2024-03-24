import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages

import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

import Home from "./home";
// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Dashboard from "./dashboard-fis-marketMap";


import jwt_decode from "jwt-decode";
import { Users } from "./users/users";
import { AddUser } from "./users/addUser";
import welcome from "./welcome";
import { Leaves } from "./userLeaves";
import AddLeave from "./userLeaves/createLeave";
import Profile from "./profile";

const token = JSON.parse(localStorage.getItem("token"));
let decoded = null;
if (token !== null) decoded = jwt_decode(token);
console.log(decoded);

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer
              toggleSettings={toggleSettings}
              showSettings={showSettings}
            />
          </main>
        </>
      )}
    />
  );
};

export default function muRoutes() {
  return (
    <>
      {decoded !== null && decoded.role === "superAdmin" ? (
        <Switch>
          <RouteWithSidebar
            exact
            path={"/"}
            component={Dashboard}
          />
          <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
          <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
          <RouteWithLoader
            exact
            path={Routes.ForgotPassword.path}
            component={ForgotPassword}
          />

          <RouteWithLoader
            exact
            path={Routes.ResetPassword.path}
            component={ResetPassword}
          />
          <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />
          <RouteWithLoader
            exact
            path={Routes.ServerError.path}
            component={ServerError}
          />

          {/* pages */}


          {/* documentation */}

          <RouteWithSidebar path={"/users"} component={Users} />
          <RouteWithSidebar path={"/adduser"} component={AddUser} />
          <RouteWithSidebar path={"/dashboard-fis"} component={Dashboard} />


          <RouteWithSidebar exact path="/leaves" component={Leaves} />

          <RouteWithSidebar
            exact
            path="/profile/:id"
            component={Profile}
          />
          <RouteWithSidebar exact path={"/pres"} component={Home} />

          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : decoded !== null && decoded.role === "Employee" ? (
        <Switch>
          <RouteWithSidebar exact path={"/pres"} component={Home} />
          <RouteWithSidebar exact path={"/"} component={Home} />


          <RouteWithSidebar exact path="/leaves" component={Leaves} />
          <RouteWithSidebar exact path="/newleave" component={AddLeave} />

          <RouteWithLoader
            exact
            path={Routes.NotFound.path}
            component={NotFoundPage}
          />

          <RouteWithSidebar
            exact
            path="/profile"
            component={Profile}
          />

          <Redirect to={Routes.NotFound.path} />
        </Switch>
      ) : (
        <Switch>
          <RouteWithLoader exact path="/signin" component={Signin} />
          <RouteWithLoader
            exact
            path="/forgot-password"
            component={ForgotPassword}
          />

          <RouteWithLoader
            exact
            path="/reset-password/:id"
            component={ResetPassword}
          />
          <RouteWithLoader
            exact
            path="/welcome/:id/:timestamp"
            component={welcome}
          />

          <Redirect to="/signin" />
        </Switch>
      )}
    </>
  );
}
