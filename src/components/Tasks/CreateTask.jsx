import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Header } from "semantic-ui-react";

import TaskFormView from "./TaskFormView";
import {
  setTaskName,
  setTaskTimeDifficulty,
  setTaskEnergyDifficulty,
  setTaskFocusDifficulty,
  setTaskGoalIDs,
  clearTaskRequestError,
  clearTaskRequestSuccess
} from "../../modules/tasks/reducer.actions";
import { createTaskRequest } from "../../modules/tasks/sagas.actions";
import {
  clearGoalRequestError,
  clearGoalRequestSuccess
} from "../../modules/goals/reducer.actions";
import { getGoalsRequest } from "../../modules/goals/sagas.actions";

class CreateTask extends Component {
  componentWillMount() {
    document.title = "Create Task - UDIA";
    this.props.dispatch(getGoalsRequest({}));
  }

  componentWillUnmount() {
    this.props.dispatch(clearGoalRequestError());
    this.props.dispatch(clearGoalRequestSuccess());
    this.props.dispatch(clearTaskRequestError());
    this.props.dispatch(clearTaskRequestSuccess());
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
      name,
      timeDifficulty,
      energyDifficulty,
      focusDifficulty,
      additionalInfo,
      goalIDs
    } = tasks;
    dispatch(
      createTaskRequest({
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
      return <Redirect to={`/tasks/${taskID}`} />
    }
    return (
      <TaskFormView
        headerText={"Create Task"}
        submitText={"Create Task"}
        successText={"Your task has been created."}
        failureText={"Create Task Failed!"}
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

export default connect(mapStateToProps)(CreateTask);
