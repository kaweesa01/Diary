import React, { Component } from "react";

import { getColor } from "../actions/colorAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNote, updateNote, cancelActivities } from "../actions/note";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      content: "",
      textDecoration: "none",
      fontWeight: 100,
      fontStyle: "normal",
    };
    this.blueColor = this.blueColor.bind(this);
    this.greenColor = this.greenColor.bind(this);
    this.yellowColor = this.yellowColor.bind(this);
    this.defaultColor = this.defaultColor.bind(this);
    this.onChange = this.onChange.bind(this);
    this.underline = this.underline.bind(this);
    this.bold = this.bold.bind(this);
    this.italisize = this.italisize.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelFunc = this.cancelFunc.bind(this);
  }

  static propTypes = {
    getColor: PropTypes.func,
    color: PropTypes.object.isRequired,
    addNote: PropTypes.func.isRequired,
    update: PropTypes.object,
    updateNote: PropTypes.func,
  };

  componentDidMount() {
    document.documentElement.style.setProperty(
      "--cardFirstColor",
      `${this.props.color.firstcolor}`
    );
    document.documentElement.style.setProperty(
      "--cardSecondColor",
      `${this.props.color.secondcolor}`
    );
    document.documentElement.style.setProperty(
      "--hsl",
      `${this.props.color.hsl}`
    );
  }

  componentDidUpdate(props, state) {
    if (this.props.update !== props.update) {
      this.setState(this.props.update);
    }
  }

  blueColor() {
    const {id} = this.props.color
    const color = {
      firstcolor: "Aquamarine",
      secondcolor: "DeepSkyBlue",
      hsl: 200,
    };
    this.props.getColor(id,color);
  }
  greenColor() {
    const {id} = this.props.color
    const color = {
      firstcolor: "MediumSpringGreen",
      secondcolor: "MediumAquaMarine",
      hsl: 142,
    };
    this.props.getColor(id,color);
  }
  yellowColor() {
    const {id} = this.props.color
    const color = { firstcolor: "LightYellow", secondcolor: "yellow", hsl: 59 };
    this.props.getColor(id,color);
  }
  defaultColor() {
    const {id} = this.props.color
    const color = {
      firstcolor: "AntiqueWhite",
      secondcolor: "#ff99cc",
      hsl: 300,
    };
    this.props.getColor(id,color);
  }

  cancelFunc(ev) {
    ev.preventDefault();

    this.setState({
      id: null,
      title: "",
      content: "",
      textDecoration: "none",
      fontWeight: 100,
      fontStyle: "normal",
    });

    this.props.cancelActivities();
  }

  underline(ev) {
    ev.preventDefault();
    ev.target.classList.toggle("active-formatter");
    this.setState((state) => ({
      textDecoration: state.textDecoration === "none" ? "underline" : "none",
    }));
  }
  bold(ev) {
    ev.preventDefault();
    ev.target.classList.toggle("active-formatter");
    this.setState((state) => ({
      fontWeight: state.fontWeight === 100 ? 900 : 100,
    }));
  }
  italisize(ev) {
    ev.preventDefault();
    ev.target.classList.toggle("active-formatter");
    this.setState((state) => ({
      fontStyle: state.fontStyle === "normal" ? "italic" : "normal",
    }));
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  onSubmit(ev) {
    ev.preventDefault();

    if (this.state.id === null) {
      const {
        title,
        content,
        textDecoration,
        fontWeight,
        fontStyle,
      } = this.state;
      const note = {
        title,
        content,
        textDecoration,
        fontWeight,
        fontStyle,
      };

      this.props.addNote(note);
    } else {
      const {
        id,
        title,
        content,
        textDecoration,
        fontWeight,
        fontStyle,
      } = this.state;
      const note = {
        title,
        content,
        textDecoration,
        fontWeight,
        fontStyle,
      };
      this.props.updateNote(id, note);
    }

    this.setState({
      id: null,
      title: "",
      content: "",
      textDecoration: "none",
      fontWeight: 100,
      fontStyle: "normal",
    });
  }

  render() {
    return (
      <div className="settingsContainer">
        <div className="bg-setting">
          <h4>Bg color</h4>
          <div className="colors">
            <button className="Blue" onClick={this.blueColor}></button>
            <button className="Green" onClick={this.greenColor}></button>
            <button className="yellow" onClick={this.yellowColor}></button>
            <button className="default" onClick={this.defaultColor}></button>
          </div>
        </div>

        <div className="inputForm">
          <h4>Note</h4>
          <div className="formContainer">
            <form onSubmit={this.onSubmit} className="formContainer">
              <div className="titleInput">
                <input
                  className="note-input"
                  type="text"
                  onChange={this.onChange}
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                />
              </div>

              <div className="format-btns">
                <button
                  style={{
                    backgroundColor: `${this.props.color.secondcolor}`,
                    textDecoration: "underline",
                  }}
                  onClick={this.underline}
                  className={
                    this.state.textDecoration === "none"
                      ? ""
                      : "active-formatter"
                  }
                >
                  U
                </button>
                <button
                  style={{
                    backgroundColor: `${this.props.color.secondcolor}`,
                    fontWeight: 900,
                    fontFamily: "sans-serif",
                  }}
                  onClick={this.bold}
                  className={
                    this.state.fontWeight === 100 ? "" : "active-formatter"
                  }
                >
                  B
                </button>
                <button
                  style={{
                    backgroundColor: `${this.props.color.secondcolor}`,
                    fontStyle: "italic",
                    fontFamily: "cursive",
                  }}
                  onClick={this.italisize}
                  className={
                    this.state.fontStyle === "normal" ? "" : "active-formatter"
                  }
                >
                  I
                </button>
              </div>
              <div className="contentInput">
                <textarea
                  value={this.state.content}
                  onChange={this.onChange}
                  name="content"
                >
                  Content
                </textarea>
              </div>
              <div className="submitBtns">
                <button
                  style={{ backgroundColor: `${this.props.color.firstcolor}` }}
                  className="submit"
                  type="submit"
                >
                  Save
                </button>
                <button onClick={this.cancelFunc} className="cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  color: state.color,
  update: state.note.update,
  errors: state.errors.error.title,
});

export default connect(mapStateToProps, {
  getColor,
  addNote,
  updateNote,
  cancelActivities,
})(Settings);
