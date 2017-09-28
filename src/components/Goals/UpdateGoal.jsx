import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import GoalFormView from "./GoalFormView";
import {
  clearGoalRequestError,
  clearGoalRequestSuccess,
  setGoalID,
  setGoalName,
  setGoalTag,
  setGoalAdditionalInfo
} from "../../modules/goals/reducer.actions";
import {
  getEditableGoalRequest,
  updateGoalRequest
} from "../../modules/goals/sagas.actions";

class UpdateGoal extends Component {
  componentWillMount() {
    document.title = "Update Goal - UDIA";
    const id = this.props.match.params.id;
    this.props.dispatch(getEditableGoalRequest({ id }));
    this.props.dispatch(clearGoalRequestError());
    this.props.dispatch(clearGoalRequestSuccess());
  }

  componentWillUnmount() {
    this.props.dispatch(setGoalID(0));
    this.props.dispatch(clearGoalRequestError());
    this.props.dispatch(clearGoalRequestSuccess());
    // reset the goal form back to defaults
    this.props.dispatch(setGoalName(""));
    this.props.dispatch(setGoalTag(""));
    this.props.dispatch(setGoalAdditionalInfo({}));
  }

  changeGoalName = event => {
    this.props.dispatch(setGoalName(event.target.value));
  };

  changeGoalTag = event => {
    this.props.dispatch(setGoalTag(event.target.value));
  };

  onSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    const { dispatch, goals, auth } = this.props;
    const { user } = auth;
    const { name, tag, additionalInfo } = goals;
    dispatch(
      updateGoalRequest({
        user: user.id || 0,
        additional_info: additionalInfo,
        id,
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
    } else if (!!goalRequestSuccess) {
      const goalID = goalRequestSuccess.id;
      return <Redirect to={`/goals/${goalID}`} />;
    }
    return (
      <GoalFormView
        headerText={"Update Goal"}
        submitText={"Save Changes"}
        successText={"Your goal has been updated."}
        failureText={"Update Goal Failed!"}
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
  return { goals: state.goals, auth: state.auth };
}

export default connect(mapStateToProps)(UpdateGoal);
