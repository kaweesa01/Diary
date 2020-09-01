import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";

import Dashbord from "./layouts/Dashbord";

// import Headers from "./layouts/Headers";
// import Settings from "./layouts/Settings";
// import Notes from "./layouts/Notes";
// import BackDrop from "./layouts/backDrop";
import store from "./store";

import "./style/style.css";
import { Provider } from "react-redux";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Alert from "./alert/alert";

import LoginForm from "../components/Accounts/Login";
import RegisterForm from "../components/Accounts/Register";

import PrivateRoute from "../components/PrivateRoutes/Private";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { loadUser } from "../components/actions/auth";

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser())
  }

  render() {
    const options = {
      positions: positions.TOP_CENTER,
      timeout: 2000,
      offset: "30px",
      transition: transitions.SCALE,
    };
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Router>
            <Fragment>
              <Alert />
              <Switch>
                <PrivateRoute exact path="/" component={Dashbord} />
                <Route exact path="/register" component={RegisterForm}/>
                <Route exact path="/login" component={LoginForm}/>
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));

export default App;
