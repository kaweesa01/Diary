import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Card from "./card";
import { readMore } from "../actions/readAction";
import PropTypes from "prop-types";

import { getNote, deleteNote, getNoteUpdate } from "../actions/note";
import { getDbColor } from "../actions/colorAction";

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      date: "",
      content: "",
    };

    this.readHandler = this.readHandler.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.getUpdateHandler = this.getUpdateHandler.bind(this);
  }

  static propTypes = {
    notes: PropTypes.array.isRequired,
    getNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func,
    getNoteUpdate: PropTypes.func,
  };

  componentDidMount() {
    this.props.getNote();
    this.props.getDbColor();
  }

  componentDidUpdate(prevProp) {
    if (prevProp !== this.props.color) {
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
  }

  readHandler(ev) {
    const backDrop = document.querySelector(".backdrop");
    backDrop.classList.remove("add-remove");
    const title =
      ev.currentTarget.parentElement.parentElement.firstElementChild
        .firstElementChild.textContent;
    const date =
      ev.currentTarget.parentElement.parentElement.firstElementChild
        .lastElementChild.textContent;
    const content =
      ev.currentTarget.parentElement.parentElement.childNodes[1]
        .firstElementChild.textContent;

    this.props.readMore(title, date, content);
  }

  dateFormatter(date) {
    const dateTimeArray = date.split(":");
    const dateArray = dateTimeArray[0].split("T")[0];
    return dateArray;
  }

  deleteHandler(id) {
    this.props.deleteNote(id);
  }
  getUpdateHandler(id) {
    this.props.getNoteUpdate(id);
  }

  render() {
    const app = document.querySelector("#app");
    this.props.notes.length || this.props.searchResult <= 4
      ? app.setAttribute("style", `--height: ${100}vh;`)
      : app.setAttribute("style", `--height: ${0}px;`);

    var card = null
    
    this.props.searchResult.length === 0
      ? (card = this.props.notes.map((note) => {
          return (
            <Card
              id={note.id}
              key={note.id}
              title={note.title}
              textDecoration={note.textDecoration}
              fontWeight={note.fontWeight}
              fontStyle={note.fontStyle}
              date={this.dateFormatter(note.date)}
              content={note.content}
              read={this.readHandler}
              delete={this.deleteHandler}
              update={this.getUpdateHandler}
            />
          );
        }))
      : (card = this.props.searchResult.map((note) => {
          return (
            <Card
              id={note.id}
              key={note.id}
              title={note.title}
              textDecoration={note.textDecoration}
              fontWeight={note.fontWeight}
              fontStyle={note.fontStyle}
              date={this.dateFormatter(note.date)}
              content={note.content}
              read={this.readHandler}
              delete={this.deleteHandler}
              update={this.getUpdateHandler}
            />
          );
        }));

    return (
      <Fragment>
        {this.props.notes.length <= 0 ? (
          <div className="card_div no-notes">Not notes saved</div>
        ) : (
          <div className="card_div">{card}</div>
        )}
        <div className='bottom-space'></div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.note.notes,
  color: state.color,
  searchResult: state.note.searchArray,
});

export default connect(mapStateToProps, {
  readMore,
  getNote,
  deleteNote,
  getNoteUpdate,
  getDbColor,
})(Notes);
