import React from "react";
import {
  Container,
  Dropdown,
  Form,
  Header,
  Label,
  Message,
  Rating
} from "semantic-ui-react";
import Error from "../Shared/Error";

const TaskFormView = ({
  headerText,
  submitText,
  successText,
  failureText,
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
        <Label pointing="left">
          {"This will take "}
          {timeDifficulty === 1 && "< 1hr"}
          {timeDifficulty === 2 && "1-2hrs"}
          {timeDifficulty === 3 && "2-4hrs"}
          {timeDifficulty === 4 && "4-8hrs"}
          {timeDifficulty === 5 && "> 8hrs"}
          {"."}
        </Label>
      </Form.Field>
      <Form.Field>
        <label>Energy Difficulty</label>
        <Rating
          icon="heart"
          rating={energyDifficulty}
          maxRating={maxRating}
          onRate={changeEnergyDifficulty}
        />
        <Label pointing="left">
          {"This will take "}
          {energyDifficulty === 1 && "no energy"}
          {energyDifficulty === 2 && "a bit of energy"}
          {energyDifficulty === 3 && "moderate energy"}
          {energyDifficulty === 4 && "a lot of energy"}
          {energyDifficulty === 5 && "all of my energy"}
          {"."}
        </Label>
      </Form.Field>
      <Form.Field>
        <label>Focus Difficulty</label>
        <Rating
          icon="heart"
          rating={focusDifficulty}
          maxRating={maxRating}
          onRate={changeFocusDifficulty}
        />
        <Label pointing="left">
          {"This will take "}
          {focusDifficulty === 1 && "no attention"}
          {focusDifficulty === 2 && "a bit of attention"}
          {focusDifficulty === 3 && "concentration"}
          {focusDifficulty === 4 && "focused concentration"}
          {focusDifficulty === 5 && "complete concentration"}
          {"."}
        </Label>
      </Form.Field>
      <Error header={failureText || "Task Request Failed!"} error={taskRequestError} />
      <Message success>
        <Message.Header>Success!</Message.Header>
        <p>{successText || "Your task action was completed."}</p>
      </Message>
      <Form.Button type="submit">{submitText || "Submit"}</Form.Button>
    </Form>
  </Container>
);

export default TaskFormView;
