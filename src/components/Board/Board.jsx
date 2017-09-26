import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Header } from "semantic-ui-react";

import { getTasksRequest } from "../../modules/tasks/sagas.actions";

class Board extends Component {
  componentWillMount() {
    document.title = "Task Board - UDIA";
    this.props.dispatch(getTasksRequest({}));
  }
  render() {
    return <BoardView />;
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

const BoardView = () => (
  <Grid container={true}>
    <Grid.Row>
      <Grid.Column>
        <Header as="h2">Tasks Board</Header>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>Yo</Grid.Column>
    </Grid.Row>
  </Grid>
);

export default connect(mapStateToProps)(Board);
