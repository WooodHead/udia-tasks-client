import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Dimmer, Header, Loader, Segment } from "semantic-ui-react";

import {
  clearGoalRequestError,
  clearGoalRequestSuccess
} from "../../modules/goals/reducer.actions";
import { getGoalRequest } from "../../modules/goals/sagas.actions";

class ViewGoal extends Component {
  componentWillMount() {
    document.title = "View Goal - UDIA";
    const id = this.props.match.params.id;
    this.props.dispatch(clearGoalRequestError());
    this.props.dispatch(clearGoalRequestSuccess());
    this.props.dispatch(getGoalRequest({ id }));
  }

  render() {
    const id = this.props.match.params.id;
    const goal = this.props.goals.goals[id] || {};
    document.title = `${goal.name} - UDIA`;
    return <ViewGoalView goal={goal} />;
  }
}

function mapStateToProps(state) {
  return { goals: state.goals };
}

const ViewGoalView = ({ goal }) => (
  <Container>
    <Segment>
      <Header as="h2">Goal</Header>
      <p>{goal.name || "undefined"}</p>
      <p>{goal.tag || "notag"}</p>
      <Dimmer active={!goal.tag} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
  </Container>
);

export default connect(mapStateToProps)(ViewGoal);
