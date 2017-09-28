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
    return <ViewTaskView task={task} deleteTask={this.deleteTask} />;
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

const ViewTaskView = ({ task, deleteTask }) => (
  <Container>
    <Header>View Task</Header>
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header>{task.name}</Item.Header>
          <Item.Description>
            <List>
              <List.Item>
                <List.Content>
                  <List.Header>{"Time"}</List.Header>
                  {task.time_difficulty === 1 && "< 1hr"}
                  {task.time_difficulty === 2 && "1-2hrs"}
                  {task.time_difficulty === 3 && "2-4hrs"}
                  {task.time_difficulty === 4 && "4-8hrs"}
                  {task.time_difficulty === 5 && "> 8hrs"}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Header>{"Energy"}</List.Header>
                {task.energy_difficulty === 1 && "no energy"}
                {task.energy_difficulty === 2 && "a bit of energy"}
                {task.energy_difficulty === 3 && "moderate energy"}
                {task.energy_difficulty === 4 && "a lot of energy"}
                {task.energy_difficulty === 5 && "all of my energy"}
              </List.Item>
              <List.Item>
                <List.Header>{"Focus"}</List.Header>
                {task.focus_difficulty === 1 && "no attention"}
                {task.focus_difficulty === 2 && "a bit of attention"}
                {task.focus_difficulty === 3 && "concentration"}
                {task.focus_difficulty === 4 && "focused concentration"}
                {task.focus_difficulty === 5 && "complete concentration"}
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
          <Item.Meta>
            <Link to={`/tasks/${task.id}/update`}>Update Task</Link>
            <Popup
              trigger={<a>Delete Task</a>}
              content={
                <Button
                  color="red"
                  content="Confirm Delete Task"
                  onClick={deleteTask}
                />
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

export default connect(mapStateToProps)(ViewTask);
