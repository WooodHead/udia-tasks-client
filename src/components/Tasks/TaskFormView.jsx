import React from "react";
import {
  Container,
  Dropdown,
  Form,
  Header,
  Message,
  Rating
} from "semantic-ui-react";
import Error from "../Shared/Error";

const TaskFormView = ({
  headerText,
  submitText,
  successText,
  isSendingTaskRequest,
  taskRequestError,
  taskRequestSuccess,
  name,
  timeDifficulty,
  energyDifficulty,
  focusDifficulty,
  goalIDs,
  changeTaskName,
  changeTimeDifficulty,
  changeEnergyDifficulty,
  changeFocusDifficulty,
  onSubmit,
  goalOptions,
  onGoalsChange,
  maxRating
}) => (
  <Container>
    <Header as="h2">{headerText || "Task Form"}</Header>
    <Form
      loading={isSendingTaskRequest}
      onSubmit={onSubmit}
      error={!!taskRequestError}
      success={!!taskRequestSuccess}
    >
      <Form.Field>
        <label>Task Name</label>
        <input
          type="text"
          placeholder="Run around the block."
          value={name}
          onChange={changeTaskName}
        />
      </Form.Field>
      <Form.Field>
        <label>Goals</label>
        <Dropdown
          multiple={true}
          search={true}
          selection={true}
          options={goalOptions}
          placeholder="MARATHON"
          onChange={onGoalsChange}
          value={goalIDs}
        />
      </Form.Field>
      <Form.Field>
        <label>Time Difficulty</label>
        <Rating
          icon="heart"
          rating={timeDifficulty}
          maxRating={maxRating}
          onRate={changeTimeDifficulty}
        />
      </Form.Field>
      <Form.Field>
        <label>Energy Difficulty</label>
        <Rating
          icon="heart"
          rating={energyDifficulty}
          maxRating={maxRating}
          onRate={changeEnergyDifficulty}
        />
      </Form.Field>
      <Form.Field>
        <label>Focus Difficulty</label>
        <Rating
          icon="heart"
          rating={focusDifficulty}
          maxRating={maxRating}
          onRate={changeFocusDifficulty}
        />
      </Form.Field>
      <Error header="Create Task Request Failed!" error={taskRequestError} />
      <Message success>
        <Message.Header>Success!</Message.Header>
        <p>{successText || "Your task action was completed."}</p>
      </Message>
      <Form.Button type="submit">{submitText || "Submit"}</Form.Button>
    </Form>
  </Container>
);

export default TaskFormView;
