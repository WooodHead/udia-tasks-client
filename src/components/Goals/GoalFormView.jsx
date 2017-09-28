import React from "react";
import { Container, Form, Header, Message } from "semantic-ui-react";

import Error from "../Shared/Error";

const GoalFormView = ({
  headerText,
  submitText,
  successText,
  failureText,
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
    <Header as="h2">{headerText || "Task Form"}</Header>
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
      <Error
        header={failureText || "Goal Request Failed!"}
        error={goalRequestError}
      />
      <Message success>
        <Message.Header>Success!</Message.Header>
        <p>{successText || "Your goal action was completed."}</p>
      </Message>
      <Form.Button type="submit">{submitText || "Submit"}</Form.Button>
    </Form>
  </Container>
);

export default GoalFormView;
