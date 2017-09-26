import React, { Component } from "react";
import { connect } from "react-redux";
import { Rail } from "semantic-ui-react";

import { deleteAppMessage } from "../../modules/messages/reducer.actions";
import AppMessage from "./AppMessage";

class AppMessages extends Component {
  dismissMessage = index => {
    return () => {
      this.props.dispatch(deleteAppMessage(index));
    };
  };

  render() {
    const { messages } = this.props.messages;
    return (
      <AppMessagesView
        messages={messages}
        dismissMessage={this.dismissMessage}
      />
    );
  }
}

function mapStateToProps(state) {
  return { messages: state.messages };
}

const AppMessagesView = ({ messages, dismissMessage }) => {
  if (messages && messages.length) {
    return (
      <Rail internal={true} attached={true} position="right">
        {messages.map((message, index) => {
          return (
            <AppMessage
              key={index}
              header={message.header}
              content={message.content}
              success={message.context === "success"}
              warning={message.context === "warning"}
              error={message.context === "error"}
              info={message.context === "info"}
              onDismiss={dismissMessage(index)}
            />
          );
        })}
      </Rail>
    );
  }
  return null;
};

export default connect(mapStateToProps)(AppMessages);
