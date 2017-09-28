import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import GoalFormView from "./GoalFormView";
import { setGoalName, setGoalTag } from "../../modules/goals/reducer.actions";
import { createGoalRequest } from "../../modules/goals/sagas.actions";

class CreateGoal extends Component {
  componentWillMount() {
    document.title = "Create Goal - UDIA";
  }

  changeGoalName = event => {
    this.props.dispatch(setGoalName(event.target.value));
  };

  changeGoalTag = event => {
    this.props.dispatch(setGoalTag(event.target.value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { dispatch, goals, auth } = this.props;
    const { user } = auth;
    const { name, tag, additionalInfo } = goals;
    dispatch(
      createGoalRequest({
        user: user.id || 0,
        additional_info: additionalInfo,
        name,
        tag
      })
    );
  };

  render() {
    const { auth, goals } = this.props;
    const { userToken } = auth;
    const {
      isSendingGoalRequest,
      goalRequestError,
      goalRequestSuccess,
      name,
      tag,
      additionalInfo
    } = goals;
    if (!userToken) {
      return <Redirect to="/auth/signin" />;
    }
    return (
      <GoalFormView
        headerText={"Create Goal"}
        submitText={"Create Goal"}
        successText={"Your goal has been created."}
        failureText={"Create Goal Failed!"}
        isSendingGoalRequest={isSendingGoalRequest}
        goalRequestError={goalRequestError}
        goalRequestSuccess={goalRequestSuccess}
        name={name}
        tag={tag}
        additionalInfo={additionalInfo}
        changeGoalName={this.changeGoalName}
        changeGoalTag={this.changeGoalTag}
        onSubmit={this.onSubmit}
      />
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, goals: state.goals };
}

export default connect(mapStateToProps)(CreateGoal);
