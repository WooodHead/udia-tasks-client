import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Grid, Header, Message } from "semantic-ui-react";

import {
  clearAuthRequestError,
  clearAuthRequestSuccess,
  setAuthFormPassword,
  setAuthFormPasswordConfirmation
} from "../../modules/auth/reducer.actions";
import { resetPasswordRequest } from "../../modules/auth/sagas.actions";
import Error from "../Shared/Error";

class ResetPassword extends Component {
  componentDidMount() {
    document.title = "Reset Password - UDIA";
  }

  componentWillMount() {
    this.props.dispatch(clearAuthRequestError());
    this.props.dispatch(clearAuthRequestSuccess());
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthRequestError());
    this.props.dispatch(clearAuthRequestSuccess());
  }

  changePassword = event => {
    this.props.dispatch(setAuthFormPassword(event.target.value));
  };

  changePasswordConfirmation = event => {
    this.props.dispatch(setAuthFormPasswordConfirmation(event.target.value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { dispatch, auth } = this.props;
    const { password, passwordConfirmation } = auth;
    const { uid, token } = this.props.match.params;
    dispatch(
      resetPasswordRequest({
        uid,
        token,
        new_password1: password,
        new_password2: passwordConfirmation
      })
    );
  };

  render() {
    const {
      isSendingAuthRequest,
      authRequestError,
      authRequestSuccess,
      password,
      passwordConfirmation
    } = this.props.auth;
    return (
      <ResetPasswordView
        isSendingAuthRequest={isSendingAuthRequest}
        authRequestError={authRequestError}
        authRequestSuccess={authRequestSuccess}
        password={password}
        passwordConfirmation={passwordConfirmation}
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

const ResetPasswordView = ({
  isSendingAuthRequest,
  authRequestError,
  authRequestSuccess,
  password,
  passwordConfirmation,
  changePassword,
  changePasswordConfirmation,
  onSubmit
}) => (
  <Grid container={true}>
    <Grid.Column>
      <Header>Reset Password</Header>
      <p>Just one step away from resetting your password!</p>
      <Form
        loading={isSendingAuthRequest}
        onSubmit={onSubmit}
        error={!!authRequestError}
        success={!!authRequestSuccess}
      >
        <Form.Field>
          <label>New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={changePassword}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={passwordConfirmation}
            onChange={changePasswordConfirmation}
          />
        </Form.Field>
        <Error
          header="Forgot Password Request Failed!"
          error={authRequestError}
        />
        <Message success>
          <Message.Header>Success!</Message.Header>
          <p>
            You may now
            {" "}
            <Link to="/auth/signin">sign in</Link>
            {" "}
            with the new credentials.
          </p>
        </Message>
        <Form.Button type="submit">Reset Password</Form.Button>
      </Form>
    </Grid.Column>
  </Grid>
);

export default connect(mapStateToProps)(ResetPassword);
