import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class Navbar extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item as={Link} to="/">
          UDIA
        </Menu.Item>
        <Menu.Item as={Link} to="/about">
          About
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/auth/signin">
            Sign In
          </Menu.Item>
          <Menu.Item as={Link} to="/auth/register">
            Sign Up
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Navbar);
