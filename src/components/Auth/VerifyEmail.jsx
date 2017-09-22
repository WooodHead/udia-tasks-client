import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Header, Loader, Message } from "semantic-ui-react";

import {
  clearAuthRequestError,
  clearAuthRequestSuccess
} from "../../modules/auth/reducer.actions";
import { emailVerificationRequest } from "../../modules/auth/sagas.actions";

class VerifyEmail extends Component {
  componentWillMount() {
    const key = this.props.match.params.key;
    this.props.dispatch(clearAuthRequestError());
    this.props.dispatch(clearAuthRequestSuccess());
    this.props.dispatch(emailVerificationRequest({ key }));
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthRequestError());
    this.props.dispatch(clearAuthRequestSuccess());
  }

  render() {
    const {
      isSendingAuthRequest,
      authRequestSuccess,
      authRequestError
    } = this.props.auth;
    return (
      <VerifyEmailView
        isSendingAuthRequest={isSendingAuthRequest}
        authRequestSuccess={authRequestSuccess}
        authRequestError={authRequestError}
      />
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

const VerifyEmailView = ({
  isSendingAuthRequest,
  authRequestSuccess,
  authRequestError
}) => (
  <Container>
    <Header>Verifying Email</Header>
    <Loader active={isSendingAuthRequest} />
    {!!authRequestSuccess &&
      <Message positive>
        <Message.Header>Email verified!</Message.Header>
        <p>
          Your email has been verified. Proceed to
          {" "}
          <Link to="/auth/signin">sign in</Link>
          {" "}
          now.
        </p>
      </Message>}
    {!!authRequestError &&
      <Message warning>
        <Message.Header>Invalid Verification Key!</Message.Header>
        <p>
          The verification key entered was invalid. What happened?
        </p>
      </Message>}
  </Container>
);

export default connect(mapStateToProps)(VerifyEmail);
