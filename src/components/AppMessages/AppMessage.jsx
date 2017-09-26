import React, { Component } from "react";
import { Message } from "semantic-ui-react";

class AppMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: -1
    };
  }

  componentDidMount() {
    var intervalId = setInterval(this.props.onDismiss, 4000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  render() {
    const {
      header,
      content,
      success,
      warning,
      error,
      info,
      onDismiss
    } = this.props;
    return (
      <Message
        header={header}
        content={content}
        success={success}
        warning={warning}
        error={error}
        info={info}
        onDismiss={onDismiss}
      />
    );
  }
}

export default AppMessage;
