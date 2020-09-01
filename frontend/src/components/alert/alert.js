import React, { Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

class Alert extends React.Component {
  componentDidUpdate(prevProps) {
    const { errors, alert, show, error, message } = this.props;
    if (errors !== prevProps.errors) {
      if (errors.title) alert.error(`Title: ${errors.title.join()}`);
      if (errors.content) alert.error(`Content: ${errors.content.join()}`);
      if (errors.msg) alert.error(`${errors.msg.join()}`);
      if (errors.pass) alert.error(`${errors.pass.join()}`);
      if (errors.regError) alert.error(`${errors.regError.username.join()}`);
    }
    if(message !== prevProps.message){
      if(message.add) alert.success(`${message.add}`)
      if(message.delete) alert.show(`${message.delete}`)
      if(message.update) alert.success(`${message.update}`)
      if(message.search) alert.info(`${message.search}`)
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors.error,
  message: state.errors.message
});

export default connect(mapStateToProps)(withAlert()(Alert));
