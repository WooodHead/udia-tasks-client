import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import SignIn from "./Auth/SignIn";
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
          <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
