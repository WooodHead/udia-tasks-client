import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Item,
  List,
  Popup
} from "semantic-ui-react";

import {
  clearGoalRequestError,
  clearGoalRequestSuccess,
  setGoalID
} from "../../modules/goals/reducer.actions";
import {
  getGoalRequest,
  deleteGoalRequest
} from "../../modules/goals/sagas.actions";

class ViewGoal extends Component {
  componentWillMount() {
    document.title = "View Goal - UDIA";
    const id = this.props.match.params.id;
    this.props.dispatch(clearGoalRequestError());
    this.props.dispatch(clearGoalRequestSuccess());
    this.props.dispatch(getGoalRequest({ id }));
  }

  componentWillUnmount() {
    this.props.dispatch(clearGoalRequestError());
    this.props.dispatch(clearGoalRequestSuccess());
    this.props.dispatch(setGoalID(0));
  }

  deleteGoal = () => {
    const id = this.props.match.params.id;
    this.props.dispatch(deleteGoalRequest({ id }));
  };

  render() {
    const id = this.props.match.params.id;
    const goal = this.props.goals.goals[id] || {};
    document.title = `${goal.name} - UDIA`;
    const { goalRequestSuccess, currentGoalID } = this.props.goals;
    if (
      typeof goalRequestSuccess === "boolean" &&
      goalRequestSuccess &&
      currentGoalID
    ) {
      return <Redirect to="/goals" />;
    }
    return <ViewGoalView goal={goal} deleteGoal={this.deleteGoal} />;
  }
}

function mapStateToProps(state) {
  return { goals: state.goals };
}

const ViewGoalView = ({ goal, deleteGoal }) => (
  <Container>
    <Header>View Goal</Header>
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header>{goal.name}</Item.Header>
          <Item.Description>
            <List>
              <List.Item>
                <List.Content>
                  <List.Header>Tag</List.Header>
                  {goal.tag}
                </List.Content>
              </List.Item>
            </List>
          </Item.Description>
          <Item.Meta>
            <Link to={`/goals/${goal.id}/update`}>Update Goal</Link>
            <Popup
              trigger={<a>Delete Goal</a>}
              content={
                <div>
                  <p>
                    Are you sure you want to delete this goal? This cannot be undone.
                  </p>
                  <Button
                    color="red"
                    content="Confirm Delete Goal"
                    onClick={deleteGoal}
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

export default connect(mapStateToProps)(ViewGoal);
