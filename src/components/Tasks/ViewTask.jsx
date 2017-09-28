import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Item,
  Label,
  List,
  Popup
} from "semantic-ui-react";

import {
  clearTaskRequestError,
  clearTaskRequestSuccess,
  setTaskID
} from "../../modules/tasks/reducer.actions";
import {
  getTaskRequest,
  deleteTaskRequest
} from "../../modules/tasks/sagas.actions";
import {
  createTaskActionRequest
} from "../../modules/taskActions/sagas.actions";
import {
  TIME_DIFFICULTY,
  ENERGY_DIFFICULTY,
  FOCUS_DIFFICULTY
} from "../../modules/tasks/constants";
import {
  ACTION_TYPE,
  ACTIONING_TYPE,
  ACTION_TRANSITIONS
} from "../../modules/taskActions/constants";
import FromTime from "../Shared/FromTime";

class ViewTask extends Component {
  componentWillMount() {
    document.title = "View Task - UDIA";
    const id = this.props.match.params.id;
    this.props.dispatch(clearTaskRequestError());
    this.props.dispatch(clearTaskRequestSuccess());
    this.props.dispatch(getTaskRequest({ id }));
  }

  componentWillUnmount() {
    this.props.dispatch(clearTaskRequestError());
    this.props.dispatch(clearTaskRequestSuccess());
    this.props.dispatch(setTaskID(0));
  }

  deleteTask = () => {
    const id = this.props.match.params.id;
    this.props.dispatch(deleteTaskRequest({ id }));
  };

  createTaskAction = nextActionType => () => {
    const id = this.props.match.params.id;
    this.props.dispatch(
      createTaskActionRequest({
        task: id,
        action: nextActionType,
      })
    );
  };

  render() {
    const id = this.props.match.params.id;
    const task = this.props.tasks.tasks[id] || {};
    document.title = `${task.name} - UDIA`;
    const { taskRequestSuccess, currentTaskID } = this.props.tasks;
    if (
      typeof taskRequestSuccess === "boolean" &&
      taskRequestSuccess &&
      currentTaskID
    ) {
      return <Redirect to="/tasks" />;
    }
    return (
      <ViewTaskView
        task={task}
        deleteTask={this.deleteTask}
        createTaskAction={this.createTaskAction}
      />
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

const ViewTaskView = ({ task, deleteTask, createTaskAction }) => {
  let currentTaskAction = null;
  if (task.actions && task.actions.length > 0) {
    currentTaskAction = task.actions[0];
  }
  return (
    <Container>
      <Header>View Task</Header>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>{task.name}</Item.Header>
            {currentTaskAction &&
              <Item.Meta>
                {ACTION_TYPE[currentTaskAction.action]}
              </Item.Meta>}
            {currentTaskAction &&
              <Item.Extra>
                {ACTION_TRANSITIONS[
                  currentTaskAction.action
                ].map((nextActionType, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={createTaskAction(nextActionType)}
                    >
                      {ACTIONING_TYPE[nextActionType]}
                    </Button>
                  );
                })}
              </Item.Extra>}
            <Item.Description>
              <List>
                <List.Item>
                  <List.Content>
                    <List.Header>{"Time"}</List.Header>
                    {TIME_DIFFICULTY[task.time_difficulty] || "unset"}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Header>{"Energy"}</List.Header>
                  {ENERGY_DIFFICULTY[task.energy_difficulty] || "unset"}
                </List.Item>
                <List.Item>
                  <List.Header>{"Focus"}</List.Header>
                  {FOCUS_DIFFICULTY[task.focus_difficulty] || "unset"}
                </List.Item>
              </List>
            </Item.Description>
            {task.goals &&
              task.goals.length > 0 &&
              <Item.Extra>
                {"Goals: "}
                {task.goals.map((goal, index) => {
                  return (
                    <Label key={index} as={Link} to={`/goals/${goal.id}`}>
                      {goal.tag}
                    </Label>
                  );
                })}
              </Item.Extra>}
            {currentTaskAction &&
              <Item.Description>
                <List>
                  {task.actions.map((action, index) => {
                    return (
                      <List.Item key={index}>
                        {ACTION_TYPE[action.action] + " "}
                        <FromTime time={action.initiated} />
                        {"."}
                      </List.Item>
                    );
                  })}
                </List>
              </Item.Description>}
            <Item.Meta>
              <Link to={`/tasks/${task.id}/update`}>Update Task</Link>
              <Popup
                trigger={<a>Delete Task</a>}
                content={
                  <div>
                    <p>
                      Are you sure you want to delete this task? This cannot be undone.
                    </p>
                    <Button
                      color="red"
                      content="Confirm Delete Task"
                      onClick={deleteTask}
                    />
                  </div>
                }
                on="click"
                position="top center"
              />
            </Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  );
};

export default connect(mapStateToProps)(ViewTask);
