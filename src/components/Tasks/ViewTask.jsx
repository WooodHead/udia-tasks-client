import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Dimmer,
  Header,
  Label,
  Loader,
  Segment
} from "semantic-ui-react";

import {
  clearTaskRequestError,
  clearTaskRequestSuccess
} from "../../modules/tasks/reducer.actions";
import { getTaskRequest } from "../../modules/tasks/sagas.actions";

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
  }

  render() {
    const id = this.props.match.params.id;
    const task = this.props.tasks.tasks[id] || {};
    document.title = `${task.name} - UDIA`;
    return <ViewTaskView task={task} />;
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

const ViewTaskView = ({ task }) => (
  <Container>
    <Segment>
      <Header as="h2">Task</Header>
      <p>{task.name || "undefined"}</p>
      <p>Time Difficulty: {task.time_difficulty}</p>
      <p>Energy Difficulty: {task.energy_difficulty}</p>
      <p>Focus Difficulty: {task.focus_difficulty}</p>
      {task.goals &&
        task.goals.map((goal, index) => {
          return (
            <Label as={Link} to={`/goals/${goal.id}`} key={index}>
              {goal.tag}
            </Label>
          );
        })}
      <p><Link to={`/tasks/${task.id}/edit`}>Edit Task</Link></p>
      <Dimmer active={!task.name} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
  </Container>
);

export default connect(mapStateToProps)(ViewTask);
