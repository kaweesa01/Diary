import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class BackDrop extends Component {
  constructor(props) {
    super(props);

    this.removeBackDrop = this.removeBackDrop.bind(this);
  }

  static propTypes = {
    readMore: PropTypes.object.isRequired,
  };

  removeBackDrop() {
    const backDrop = document.querySelector(".backdrop");
    backDrop.classList.add("add-remove");
  }

  render() {
    const { title, date, content } = this.props.readMore;
    return (
      <div className="backdrop add-remove">
        <div className="card backdropCard">
          <div
            style={{ backgroundColor: `${this.props.color.firstcolor}` }}
            className="topBar"
          >
            <h3>{title}</h3>
            <div
              style={{ backgroundColor: `${this.props.color.secondcolor}` }}
              className="dateDiv"
            >
              <h4>{date}</h4>
            </div>
          </div>
          <div className="contentContainer">
            <p className="content">{content}</p>
          </div>
          <div className="backdropbtnContainer"  style={{ backgroundColor: `${this.props.color.secondcolor}` }}>
            <div className="ctr">
              <button className="btn update">Update</button>
              <button className="btn delete">Delete</button>
            </div>
            <div className="closeBtn">
              <button onClick={this.removeBackDrop}>x</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readMore: state.readMore,
  color: state.color,
});

export default connect(mapStateToProps, {})(BackDrop);
