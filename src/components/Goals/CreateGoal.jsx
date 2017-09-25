import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Form, Header, Message } from "semantic-ui-react";

import { setGoalName, setGoalTag } from "../../modules/goals/reducer.actions";
import { createGoalRequest } from "../../modules/goals/sagas.actions";
import Error from "../Shared/Error";

class CreateGoal extends Component {
  componentWillMount() {
    document.title = "Create Goal - UDIA";
  }

  changeGoalName = event => {
    this.props.dispatch(setGoalName(event.target.value));
  };

  changeGoalTag = event => {
    this.props.dispatch(setGoalTag(event.target.value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { dispatch, goals, auth } = this.props;
    const { user } = auth;
    const { name, tag, additionalInfo } = goals;
    dispatch(
      createGoalRequest({
        user: user.id || 0,
        additional_info: additionalInfo,
        name,
        tag
      })
    );
  };

  render() {
    const { auth, goals } = this.props;
    const { userToken } = auth;
    const {
      isSendingGoalRequest,
      goalRequestError,
      goalRequestSuccess,
      name,
      tag,
      additionalInfo
    } = goals;
    if (!userToken) {
      return <Redirect to="/auth/signin" />;
    }
    return (
      <CreateGoalView
        isSendingGoalRequest={isSendingGoalRequest}
        goalRequestError={goalRequestError}
        goalRequestSuccess={goalRequestSuccess}
        name={name}
        tag={tag}
        additionalInfo={additionalInfo}
        changeGoalName={this.changeGoalName}
        changeGoalTag={this.changeGoalTag}
        onSubmit={this.onSubmit}
      />
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, goals: state.goals };
}

const CreateGoalView = ({
  isSendingGoalRequest,
  goalRequestError,
  goalRequestSuccess,
  name,
  tag,
  additionalInfo,
  changeGoalName,
  changeGoalTag,
  onSubmit
}) => (
  <Container>
    <Header as="h2">Create Goal</Header>
    <Form
      loading={isSendingGoalRequest}
      onSubmit={onSubmit}
      error={!!goalRequestError}
      success={!!goalRequestSuccess}
    >
      <Form.Field>
        <label>Goal Name</label>
        <input
          type="text"
          placeholder="I want to run an ultra marathon!"
          value={name}
          onChange={changeGoalName}
        />
      </Form.Field>
      <Form.Field>
        <label>Goal Tag</label>
        <input
          type="text"
          placeholder="MARATHON"
          value={tag}
          onChange={changeGoalTag}
        />
      </Form.Field>
      <Error header="Create Goal Request Failed!" error={goalRequestError} />
      <Message success>
        <Message.Header>Success!</Message.Header>
        <p>Your goal has successfully been created.</p>
      </Message>
      <Form.Button type="submit">Create Goal</Form.Button>
    </Form>
  </Container>
);

export default connect(mapStateToProps)(CreateGoal);
