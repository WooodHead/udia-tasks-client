import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Form, Header, Message } from "semantic-ui-react";

import {
  clearAuthRequestError,
  clearAuthRequestSuccess,
  setAuthFormPassword,
  setAuthFormPasswordConfirmation,
  setAuthFormOldPassword
} from "../../modules/auth/reducer.actions";
import { changePasswordRequest } from "../../modules/auth/sagas.actions";
import Error from "../Shared/Error";

class Settings extends Component {
  componentWillMount() {
    document.title = "Account Settings - UDIA";
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

  changeOldPassword = event => {
    this.props.dispatch(setAuthFormOldPassword(event.target.value));
  };

  onSubmitChangePassword = event => {
    event.preventDefault();
    const { dispatch, auth } = this.props;
    const { password, passwordConfirmation, oldPassword } = auth;
    dispatch(
      changePasswordRequest({
        new_password1: password,
        new_password2: passwordConfirmation,
        old_password: oldPassword
      })
    );
  };

  render() {
    const {
      userToken,
      user,
      password,
      passwordConfirmation,
      oldPassword,
      isSendingAuthRequest,
      authRequestError,
      authRequestSuccess
    } = this.props.auth;
    if (!userToken) {
      return <Redirect to="/auth/signin" />;
    }
    return (
      <SettingsView
        user={user}
        isSendingAuthRequest={isSendingAuthRequest}
        authRequestError={authRequestError}
        authRequestSuccess={authRequestSuccess}
        password={password}
        passwordConfirmation={passwordConfirmation}
        oldPassword={oldPassword}
        changePassword={this.changePassword}
        changePasswordConfirmation={this.changePasswordConfirmation}
        changeOldPassword={this.changeOldPassword}
        onSubmitChangePassword={this.onSubmitChangePassword}
      />
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

const SettingsView = ({
  user,
  isSendingAuthRequest,
  authRequestError,
  authRequestSuccess,
  password,
  passwordConfirmation,
  oldPassword,
  changePassword,
  changePasswordConfirmation,
  changeOldPassword,
  onSubmitChangePassword,
  logout
}) => (
  <Container>
    <Header as="h2">Account Settings</Header>
    <Header>Change Password</Header>
    <Form
      loading={isSendingAuthRequest}
      onSubmit={onSubmitChangePassword}
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
      <Form.Field>
        <label>Current Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={oldPassword}
          onChange={changeOldPassword}
        />
      </Form.Field>
      <Error
        header="Change Password Request Failed!"
        error={authRequestError}
      />
      <Message success>
        <Message.Header>Success!</Message.Header>
        <p>Your password has successfully been changed.</p>
      </Message>
      <Form.Button type="submit">Change Password</Form.Button>
    </Form>
  </Container>
);

export default connect(mapStateToProps)(Settings);
