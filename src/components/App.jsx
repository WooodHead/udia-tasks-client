import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Settings from "./Auth/Settings";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import VerifyEmail from "./Auth/VerifyEmail";
import About from "./Static/About";
import Footer from "./Static/Footer";
import Home from "./Static/Home";
import NoMatch from "./Static/NoMatch";
import Navbar from "./Navbar";

class App extends Component {
  render() {
    const siteContentStyle = {
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column"
    };
    return (
      <div style={siteContentStyle}>
        <Navbar />
        <div style={{ flex: "1" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/auth/signin" component={SignIn} />
            <Route exact path="/auth/signup" component={SignUp} />
            <Route exact path="/auth/forgot-password" component={ForgotPassword} />
            <Route exact path="/auth/reset-password/:uid/:token" component={ResetPassword} />
            <Route exact path="/auth/verify-email/:key" component={VerifyEmail} />
            <Route exact path="/auth/settings" component={Settings} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
