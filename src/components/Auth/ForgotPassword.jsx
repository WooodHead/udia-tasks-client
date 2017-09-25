import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";

import {
  clearAuthRequestError,
  clearAuthRequestSuccess,
  setAuthFormEmail
} from "../../modules/auth/reducer.actions";
import { forgotPasswordRequest } from "../../modules/auth/sagas.actions";
import Error from "../Shared/Error";

class ForgotPassword extends Component {
  componentDidMount() {
    document.title = "Forgot Password - UDIA";
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthRequestError());
    this.props.dispatch(clearAuthRequestSuccess());
  }

  changeEmail = event => {
    this.props.dispatch(setAuthFormEmail(event.target.value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { dispatch, auth } = this.props;
    const { email } = auth;
    dispatch(forgotPasswordRequest({ email }));
  };

  render() {
    const {
      isSendingAuthRequest,
      authRequestError,
      authRequestSuccess,
      email
    } = this.props.auth;
    return (
      <ForgotPasswordView
        isSendingAuthRequest={isSendingAuthRequest}
        authRequestError={authRequestError}
        authRequestSuccess={authRequestSuccess}
        email={email}
        changeEmail={this.changeEmail}
        onSubmit={this.onSubmit}
      />
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

const ForgotPasswordView = ({
  isSendingAuthRequest,
  authRequestError,
  authRequestSuccess,
  email,
  changeEmail,
  onSubmit
}) => (
  <Grid container={true}>
    <Grid.Column>
      <Header>Forgot Password</Header>
      <p>
        Enter your email! We'll will send you a link to reset your password.
      </p>
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
        <Error
          header="Forgot Password Request Failed!"
          error={authRequestError}
        />
        <Message success>
          <Message.Header>Success!</Message.Header>
          <p>
            If the email is associated with an account, a password reset link will be sent to it.
          </p>
        </Message>
        <Button type="submit">Reset Password</Button>
      </Form>
    </Grid.Column>
  </Grid>
);

export default connect(mapStateToProps)(ForgotPassword);
