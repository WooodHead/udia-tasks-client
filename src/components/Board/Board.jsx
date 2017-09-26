import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Grid, Header, Label } from "semantic-ui-react";

import {
  clearTaskRequestError,
  clearTaskRequestSuccess
} from "../../modules/tasks/reducer.actions";
import { getTasksRequest } from "../../modules/tasks/sagas.actions";

class Board extends Component {
  componentWillMount() {
    document.title = "Task Board - UDIA";
    this.props.dispatch(getTasksRequest({}));
  }

  componentWillUnmount() {
    this.props.dispatch(clearTaskRequestError());
    this.props.dispatch(clearTaskRequestSuccess());
  }

  render() {
    const { tasks, tasksOrdering } = this.props.tasks;
    return <BoardView tasks={tasks} tasksOrdering={tasksOrdering} />;
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

const BoardView = ({ tasks, tasksOrdering }) => (
  <Grid container={true}>
    <Grid.Row>
      <Grid.Column>
        <Header as="h2">Tasks Board</Header>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        {tasksOrdering.map((taskId, index) => {
          let task = tasks[taskId] || {};
          return (
            <Card key={index}>
              <Card.Content>
                <Card.Header>
                  {task.name}
                </Card.Header>
                <Card.Meta>
                  {"Time: "}{task.time_difficulty}<br />
                  {"Energy: "}{task.energy_difficulty}<br />
                  {"Focus: "}{task.focus_difficulty}
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                {task.goals.map((goal, index) => {
                  return <Label key={index}>{goal.tag}</Label>;
                })}
              </Card.Content>
            </Card>
          );
        })}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default connect(mapStateToProps)(Board);
