import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "kaweesa Musas",
      content: "hello",
      textDecoration: "none",
      fontWeight: 100,
      fontStyle: "normal",
    };

    this.Converter = this.Converter.bind(this);
    this.getLength = this.getLength.bind(this);
  }

  static propTypes = {
    color: PropTypes.object.isRequired,
  };

  Converter = (content, limit = 150) => {
    const newContent = [];
    if (content.length > limit) {
      content.split(" ").reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newContent.push(cur);
        }
        return acc + cur.length;
      }, 0);

      // return the result
      const filtered = newContent.filter((cur) => {
        return cur != "";
      });
      return `${filtered.join(" ")} ...`;
    }
    return content;
  };

  // Converter(content) {
  //   const contentArray = [];
  //   const newArray = content.split(" ");

  //   const filtered = newArray.filter( cur => {
  //     return cur != ""
  //   })

  //   const limit = 35;
  //   if (filtered.length < limit) {
  //     return filtered.join(" ");
  //   } else if (filtered.length >= limit) {
  //     for (let i = 0; i < limit; i++) {
  //       contentArray.push(filtered[i]);
  //     }
  //     console.log(contentArray)
  //     return `${contentArray.join(" ")} ...`;
  //   }
  //   return content
  // }

  getLength(content) {
    const newArray = content.split(" ");
    const filtered = newArray.filter((cur) => {
      return cur != "";
    });
    return filtered.length;
  }


  render() {
    const {
      title,
      date,
      content,
      read,
      id,
      textDecoration,
      fontWeight,
      fontStyle,
    } = this.props;
    return (
      <Fragment>
        <div className="sm-card card">
          <div
            style={{ backgroundColor: `${this.props.color.firstcolor}` }}
            className="topBar"
          >
            <h3
              style={{
                fontFamily: "sans-serif",
                fontWeight: fontWeight,
                textDecoration: textDecoration,
                fontStyle: fontStyle,
              }}
            >
              {title}
            </h3>
            <div
              style={{ backgroundColor: `${this.props.color.secondcolor}` }}
              className="dateDiv"
            >
              <h4>{date}</h4>
            </div>
          </div>
          <div className="bigDiv">
            <p className="content">
              {content.replace(/(\r\n|\r|\n)/g, "</br>")}
            </p>
          </div>
          <div className="contentContainer">
            <p className="content">{this.Converter(content)}</p>
          </div>
          <div
            style={{ backgroundColor: `${this.props.color.secondcolor}` }}
            className="btnContainer"
          >
            <button
              onClick={this.props.update.bind(this, id)}
              className="btn update"
            >
              Update
            </button>
            <button
              onClick={this.props.delete.bind(this, id)}
              className="btn delete"
            >
              Delete
            </button>
            {this.getLength(content) < 31 ? null : (
              <button onClick={read} className="btn read">
                Read
              </button>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  color: state.color,
});

export default connect(mapStateToProps, {})(Card);
