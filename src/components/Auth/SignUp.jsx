import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";

import {
  clearAuthRequestError,
  clearAuthRequestSuccess,
  setAuthFormEmail,
  setAuthFormUsername,
  setAuthFormPassword,
  setAuthFormPasswordConfirmation
} from "../../modules/auth/reducer.actions";
import { registerRequest } from "../../modules/auth/sagas.actions";
import Error from "../Shared/Error";

class SignUp extends Component {
  componentWillMount() {
    document.title = "Sign Up - UDIA";
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthRequestError());
    this.props.dispatch(clearAuthRequestSuccess());
  }

  changeEmail = event => {
    this.props.dispatch(setAuthFormEmail(event.target.value));
  };

  changeUsername = event => {
    this.props.dispatch(setAuthFormUsername(event.target.value));
  };

  changePassword = event => {
    this.props.dispatch(setAuthFormPassword(event.target.value));
  };

  changePasswordConfirmation = event => {
    this.props.dispatch(setAuthFormPasswordConfirmation(event.target.value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { dispatch, auth } = this.props;
    const { email, username, password, passwordConfirmation } = auth;
    dispatch(
      registerRequest({
        email,
        username,
        password1: password,
        password2: passwordConfirmation
      })
    );
  };

  render() {
    const {
      isSendingAuthRequest,
      authRequestError,
      authRequestSuccess,
      email,
      username,
      password,
      passwordConfirmation
    } = this.props.auth;
    return (
      <SignUpView
        isSendingAuthRequest={isSendingAuthRequest}
        authRequestError={authRequestError}
        authRequestSuccess={authRequestSuccess}
        email={email}
        username={username}
        password={password}
        passwordConfirmation={passwordConfirmation}
        changeEmail={this.changeEmail}
        changeUsername={this.changeUsername}
        changePassword={this.changePassword}
        changePasswordConfirmation={this.changePasswordConfirmation}
        onSubmit={this.onSubmit}
      />
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

const SignUpView = ({
  isSendingAuthRequest,
  authRequestError,
  authRequestSuccess,
  email,
  username,
  password,
  passwordConfirmation,
  changeEmail,
  changeUsername,
  changePassword,
  changePasswordConfirmation,
  onSubmit
}) => (
  <Grid container={true}>
    <Grid.Column>
      <Header>Sign Up</Header>
      <Form
        loading={isSendingAuthRequest}
        onSubmit={onSubmit}
        error={!!authRequestError}
        success={!!authRequestSuccess}
      >
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            placeholder="alexander@udia.ca"
            value={email || ""}
            onChange={changeEmail}
          />
        </Form.Field>
        <Form.Field>
          <label>Username</label>
          <input
            type="text"
            placeholder="alex"
            value={username || ""}
            onChange={changeUsername}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password || ""}
            onChange={changePassword}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={passwordConfirmation || ""}
            onChange={changePasswordConfirmation}
          />
        </Form.Field>
        <Error header="Sign Up failed!" error={authRequestError} />
        <Message success>
          <Message.Header>Success!</Message.Header>
          <p>A verification email has been sent to your email address.</p>
        </Message>
        <Button type="submit">Sign Up</Button>
      </Form>
      <Message>
        <p>
          Already a member? <Link to="/auth/signin">Sign in</Link>.
        </p>
      </Message>
    </Grid.Column>
  </Grid>
);

export default connect(mapStateToProps)(SignUp);
