import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Header, Item, Label } from "semantic-ui-react";

import {
  clearGoalRequestError,
  clearGoalRequestSuccess
} from "../../modules/goals/reducer.actions";
import { getGoalsRequest } from "../../modules/goals/sagas.actions";

class ViewGoals extends Component {
  componentWillMount() {
    document.title = "Goals List - UDIA";
    this.props.dispatch(getGoalsRequest({}));
  }

  componentWillUnmount() {
    this.props.dispatch(clearGoalRequestError());
    this.props.dispatch(clearGoalRequestSuccess());
  }

  render() {
    const { goals, goalsOrdering } = this.props.goals;
    return <ViewGoalsView goals={goals} goalsOrdering={goalsOrdering} />;
  }
}

function mapStateToProps(state) {
  return { goals: state.goals };
}

const ViewGoalsView = ({ goals, goalsOrdering }) => (
  <Container>
    <Header>All Goals</Header>
    <Item.Group>
      {goalsOrdering.map((goalId, index) => {
        let goal = goals[goalId] || {};
        return (
          <Item key={index}>
            <Item.Content>
              <Item.Header>
                <Link to={`/goals/${goal.id}`}>{goal.name}</Link>
              </Item.Header>
              <Item.Extra>
                <Label key={index} as={Link} to={`/goals/${goal.id}`}>
                  {goal.tag}
                </Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        );
      })}
      {goalsOrdering.length <= 0 &&
        <Item>
          <Item.Content>
            <Item.Header>
              No goals exist!
            </Item.Header>
            <Item.Description>
              {"Why don't you create a goal "}
              <Link to={"/goals/create"}>here</Link>
              ?
            </Item.Description>
          </Item.Content>
        </Item>}
    </Item.Group>
  </Container>
);

export default connect(mapStateToProps)(ViewGoals);
