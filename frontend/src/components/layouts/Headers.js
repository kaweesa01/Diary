import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchNote } from "../actions/note";
import { logoutUser } from "../actions/auth";

class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    color: PropTypes.object.isRequired,
    notes: PropTypes.array.isRequired,
    searchNote: PropTypes.func,
  };

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.searchNote(this.props.notes, this.state.search);
  }

  render() {
    return (
      <div className="navContainer">
        <nav className="navBar">
          <div className="name">{this.props.user}'s Diary</div>
          <div className="searchBox">
            <div className="inputContainer">
              <form onSubmit={this.onSubmit}>
                <div className="search">
                  <input
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.onChange}
                    placeholder="Search by title"
                  />
                  <button
                    style={{
                      backgroundColor: `${this.props.color.secondcolor}`,
                    }}
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="logoutBtn">
            <button onClick={this.props.logoutUser} className="log-out-btn">
              Logout
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.note.notes,
  user: state.auth.user.username,
  color: state.color,
});

export default connect(mapStateToProps, { searchNote, logoutUser })(Headers);
