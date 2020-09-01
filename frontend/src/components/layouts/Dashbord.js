import React, { Component, Fragment } from "react";

import Headers from "./Headers";
import Settings from "./Settings";
import Notes from "./Notes";
import BackDrop from "./backDrop";

class Dashbord extends Component {
  render() {
    return (
      <Fragment>
        <BackDrop />
        <Headers />
        <div className="bodyContainer">
          <div className="substitute"></div>
          <Settings />
          <Notes />
        </div>
      </Fragment>
    );
  }
}

export default Dashbord;
