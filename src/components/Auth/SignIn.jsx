import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";

import {
  clearAuthRequestError,
  clearAuthRequestSuccess,
  setAuthFormEmail,
  setAuthFormPassword
} from "../../modules/auth/reducer.actions";
import { loginRequest } from "../../modules/auth/sagas.actions";
import Error from "../Shared/Error";

class SignIn extends Component {
  componentWillMount() {
    document.title = "Sign In - UDIA";
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthRequestError());
    this.props.dispatch(clearAuthRequestSuccess());
  }

  changeEmail = event => {
    this.props.dispatch(setAuthFormEmail(event.target.value));
  };

  changePassword = event => {
    this.props.dispatch(setAuthFormPassword(event.target.value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { dispatch, auth } = this.props;
    const { email, password } = auth;
    dispatch(loginRequest({ email, password }));
  };

  render() {
    const {
      user,
      userToken,
      isSendingAuthRequest,
      authRequestError,
      authRequestSuccess,
      email,
      password
    } = this.props.auth;
    if (userToken && Object.keys(user).length > 0) {
      return <Redirect to="/auth/settings" />;
    }
    return (
      <SignInView
        isSendingAuthRequest={isSendingAuthRequest}
        authRequestError={authRequestError}
        authRequestSuccess={authRequestSuccess}
        email={email}
        password={password}
        changeEmail={this.changeEmail}
        changePassword={this.changePassword}
        onSubmit={this.onSubmit}
      />
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

const SignInView = ({
  isSendingAuthRequest,
  authRequestError,
  authRequestSuccess,
  email,
  password,
  changeEmail,
  changePassword,
  onSubmit
}) => (
  <Grid container={true}>
    <Grid.Column>
      <Header>Sign In</Header>
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
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password || ""}
            onChange={changePassword}
          />
        </Form.Field>
        <Error header="Sign In failed!" error={authRequestError} />
        <Message success>
          <Message.Header>Success!</Message.Header>
          <p>Redirecting you now.</p>
        </Message>
        <Button type="submit">Sign In</Button>
      </Form>
      <Message>
        <p>
          Forgot your password?
          {" "}
          <Link to="/auth/forgot-password">Reset it here</Link>
          .
          <br />
          New to us? <Link to="/auth/signup">Sign up</Link>.
        </p>
      </Message>
    </Grid.Column>
  </Grid>
);

export default connect(mapStateToProps)(SignIn);
