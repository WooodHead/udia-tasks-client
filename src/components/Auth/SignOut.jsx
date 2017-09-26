import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Header, Message } from "semantic-ui-react";

import { logoutRequest } from "../../modules/auth/sagas.actions";
import Logo from "../Static/Logo";
class SignOut extends Component {
  componentWillMount() {
    this.props.dispatch(logoutRequest());
  }
  render() {
    return <SignOutView />;
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

const SignOutView = () => (
  <Grid container={true}>
    <Grid.Column>
      <Header>Sign Out</Header>
      <Message>
        <div style={{ textAlign: "center" }}><Logo maxHeight="100px" /></div>
        <p>You successfully signed out. See you later!</p>
      </Message>
    </Grid.Column>
  </Grid>
);

export default connect(mapStateToProps)(SignOut);
