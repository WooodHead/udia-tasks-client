import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Popup } from "semantic-ui-react";

const propTypes = {
  time: PropTypes.string.isRequired
};

class FromTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTime: moment(this.props.time).fromNow()
    };
  }

  componentDidMount() {
    this.setTime();
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  setTime = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    var intervalId = -1;
    if (moment().diff(this.props.time, "days")) {
      intervalId = setInterval(this.setTime, 86400000);
    } else if (moment().diff(this.props.time, "hours")) {
      intervalId = setInterval(this.setTime, 3600000);
    } else if (moment().diff(this.props.time, "minutes")) {
      intervalId = setInterval(this.setTime, 60000);
    } else {
      intervalId = setInterval(this.setTime, 1000);
    }
    const stateDiff = {
      displayTime: moment(this.props.time).fromNow(),
      intervalId
    };
    this.setState(stateDiff);
  };

  updateDisplayTime = () => {};

  render() {
    return (
      <Popup wide="very" trigger={<span>{this.state.displayTime}</span>}>
        {moment(this.props.time).format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </Popup>
    );
  }
}

FromTime.propTypes = propTypes;

export default FromTime;
