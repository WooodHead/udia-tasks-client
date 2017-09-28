import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Header, Item, Label } from "semantic-ui-react";

import {
  clearTaskRequestError,
  clearTaskRequestSuccess
} from "../../modules/tasks/reducer.actions";
import { getTasksRequest } from "../../modules/tasks/sagas.actions";

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
              <Item.Description>
                {"Time: "}
                {task.time_difficulty === 1 && "< 1hr"}
                {task.time_difficulty === 2 && "1-2hrs"}
                {task.time_difficulty === 3 && "2-4hrs"}
                {task.time_difficulty === 4 && "4-8hrs"}
                {task.time_difficulty === 5 && "> 8hrs"}
                <br />
                {"Energy: "}
                {task.energy_difficulty === 1 && "no energy"}
                {task.energy_difficulty === 2 && "a bit of energy"}
                {task.energy_difficulty === 3 && "moderate energy"}
                {task.energy_difficulty === 4 && "a lot of energy"}
                {task.energy_difficulty === 5 && "all of my energy"}
                <br />
                {"Focus: "}
                {task.focus_difficulty === 1 && "no attention"}
                {task.focus_difficulty === 2 && "a bit of attention"}
                {task.focus_difficulty === 3 && "concentration"}
                {task.focus_difficulty === 4 && "focused concentration"}
                {task.focus_difficulty === 5 && "complete concentration"}
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
