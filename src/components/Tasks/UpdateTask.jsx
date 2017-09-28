import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Header } from "semantic-ui-react";

import TaskFormView from "./TaskFormView";
import {
  setTaskID,
  setTaskName,
  setTaskTimeDifficulty,
  setTaskEnergyDifficulty,
  setTaskFocusDifficulty,
  setTaskGoalIDs,
  setTaskAdditionalInfo,
  clearTaskRequestError,
  clearTaskRequestSuccess
} from "../../modules/tasks/reducer.actions";
import {
  getEditableTaskRequest,
  updateTaskRequest
} from "../../modules/tasks/sagas.actions";
import {
  clearGoalRequestError,
  clearGoalRequestSuccess
} from "../../modules/goals/reducer.actions";
import { getGoalsRequest } from "../../modules/goals/sagas.actions";

class UpdateTask extends Component {
  componentWillMount() {
    document.title = "Update Task - UDIA";
    const id = this.props.match.params.id;
    this.props.dispatch(getGoalsRequest({}));
    this.props.dispatch(clearTaskRequestError());
    this.props.dispatch(clearTaskRequestSuccess());
    this.props.dispatch(setTaskID(id));
    this.props.dispatch(getEditableTaskRequest({ id }));
  }

  componentWillUnmount() {
    this.props.dispatch(setTaskID(0));
    this.props.dispatch(clearTaskRequestError());
    this.props.dispatch(clearTaskRequestSuccess());
    this.props.dispatch(clearGoalRequestError());
    this.props.dispatch(clearGoalRequestSuccess());
    // reset the task form back to defaults
    this.props.dispatch(setTaskID(0));
    this.props.dispatch(setTaskName(""));
    this.props.dispatch(setTaskTimeDifficulty(1));
    this.props.dispatch(setTaskEnergyDifficulty(2));
    this.props.dispatch(setTaskFocusDifficulty(3));
    this.props.dispatch(setTaskGoalIDs([]));
    this.props.dispatch(setTaskAdditionalInfo({}));
  }

  changeTaskName = event => {
    this.props.dispatch(setTaskName(event.target.value));
  };

  changeTimeDifficulty = (event, { rating }) => {
    this.props.dispatch(setTaskTimeDifficulty(rating));
  };

  changeEnergyDifficulty = (event, { rating }) => {
    this.props.dispatch(setTaskEnergyDifficulty(rating));
  };

  changeFocusDifficulty = (event, { rating }) => {
    this.props.dispatch(setTaskFocusDifficulty(rating));
  };

  changeTaskGoalIDs = event => {
    this.props.dispatch(setTaskGoalIDs(event.target.value));
  };

  onSubmit = event => {
    event.preventDefault();
    const { dispatch, tasks, auth } = this.props;
    const { user } = auth;
    const {
      currentTaskID,
      name,
      timeDifficulty,
      energyDifficulty,
      focusDifficulty,
      additionalInfo,
      goalIDs
    } = tasks;
    dispatch(
      updateTaskRequest({
        id: currentTaskID,
        user: user.id || 0,
        additional_info: additionalInfo,
        goal_ids: goalIDs,
        time_difficulty: timeDifficulty,
        energy_difficulty: energyDifficulty,
        focus_difficulty: focusDifficulty,
        name
      })
    );
  };

  onGoalsChange = (event, { value }) => {
    this.props.dispatch(setTaskGoalIDs(value));
  };

  render() {
    const { auth, tasks } = this.props;
    const {
      isSendingTaskRequest,
      taskRequestError,
      taskRequestSuccess,
      name,
      timeDifficulty,
      energyDifficulty,
      focusDifficulty,
      additionalInfo,
      goalIDs
    } = tasks;
    const goalsList = this.props.goals.goals;
    document.title = `${name} - UDIA`;
    let goalOptions = [];
    Object.entries(goalsList).forEach(([key, value]) => {
      goalOptions.push({
        value: key,
        key,
        text: value.tag,
        content: <Header content={value.tag} subheader={value.name} />
      });
    });
    const MAX_RATING = 5;

    if (!auth.userToken) {
      return <Redirect to="/auth/signin" />;
    } else if (!!taskRequestSuccess) {
      const taskID = taskRequestSuccess.id;
      return <Redirect to={`/tasks/${taskID}`} />;
    }
    return (
      <TaskFormView
        headerText={"Update Task"}
        submitText={"Save Changes"}
        successText={"Your task has been updated."}
        failureText={"Update Task Failed!"}
        isSendingTaskRequest={isSendingTaskRequest}
        taskRequestError={taskRequestError}
        taskRequestSuccess={taskRequestSuccess}
        name={name}
        timeDifficulty={timeDifficulty}
        energyDifficulty={energyDifficulty}
        focusDifficulty={focusDifficulty}
        goalIDs={goalIDs}
        additionalInfo={additionalInfo}
        changeTaskName={this.changeTaskName}
        changeTimeDifficulty={this.changeTimeDifficulty}
        changeEnergyDifficulty={this.changeEnergyDifficulty}
        changeFocusDifficulty={this.changeFocusDifficulty}
        onSubmit={this.onSubmit}
        goalOptions={goalOptions}
        onGoalsChange={this.onGoalsChange}
        maxRating={MAX_RATING}
      />
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, tasks: state.tasks, goals: state.goals };
}

export default connect(mapStateToProps)(UpdateTask);
