import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Header, Item, Label } from "semantic-ui-react";

import {
  clearTaskRequestError,
  clearTaskRequestSuccess
} from "../../modules/tasks/reducer.actions";
import { getTasksRequest } from "../../modules/tasks/sagas.actions";
import {
  TIME_DIFFICULTY,
  ENERGY_DIFFICULTY,
  FOCUS_DIFFICULTY
} from "../../modules/tasks/constants";
import { ACTION_TYPE } from "../../modules/taskActions/constants";

class ViewTasks extends Component {
  componentWillMount() {
    document.title = "Tasks List - UDIA";
    this.props.dispatch(getTasksRequest({}));
  }

  componentWillUnmount() {
    this.props.dispatch(clearTaskRequestError());
    this.props.dispatch(clearTaskRequestSuccess());
  }

  render() {
    const { tasks, tasksOrdering } = this.props.tasks;
    return <ViewTasksView tasks={tasks} tasksOrdering={tasksOrdering} />;
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

const ViewTasksView = ({ tasks, tasksOrdering }) => (
  <Container>
    <Header>All Tasks</Header>
    <Item.Group>
      {tasksOrdering.map((taskId, index) => {
        let task = tasks[taskId] || {};
        return (
          <Item key={index}>
            <Item.Content>
              <Item.Header>
                <Link to={`/tasks/${task.id}`}>{task.name}</Link>
              </Item.Header>
              {task.actions.length > 0 &&
                <Item.Meta>
                  {ACTION_TYPE[task.actions[0].action]}
                </Item.Meta>}
              <Item.Description>
                {"Time: "}
                {TIME_DIFFICULTY[task.time_difficulty] || "unset"}
                <br />
                {"Energy: "}
                {ENERGY_DIFFICULTY[task.energy_difficulty] || "unset"}
                <br />
                {"Focus: "}
                {FOCUS_DIFFICULTY[task.focus_difficulty] || "unset"}
              </Item.Description>
              {task.goals &&
                task.goals.length > 0 &&
                <Item.Extra>
                  {task.goals.map((goal, index) => {
                    return (
                      <Label key={index} as={Link} to={`/goals/${goal.id}`}>
                        {goal.tag}
                      </Label>
                    );
                  })}
                </Item.Extra>}
            </Item.Content>
          </Item>
        );
      })}
      {tasksOrdering.length <= 0 &&
        <Item>
          <Item.Content>
            <Item.Header>No tasks exist!</Item.Header>
            <Item.Description>
              {"Why don't you create a task "}
              <Link to="/tasks/create">here</Link>
              ?
            </Item.Description>
          </Item.Content>
        </Item>}
    </Item.Group>
  </Container>
);

export default connect(mapStateToProps)(ViewTasks);
