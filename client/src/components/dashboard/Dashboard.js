import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import NotifyMe from "react-notification-timeline";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    // const { user } = this.props.auth;
    const user = 'Shyam'
    const data = [
      {
        "update":"70 new employees are shifted",
        "timestamp":1596119688264
      },
      {
        "update":"Time to take a Break, TADA!!!",
        "timestamp":1596119686811
      }
    ];

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user}
              {/* {user.name.split(" ")[0]} */}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <div>
              <NotifyMe
                data={data}
                storageKey="notific_key"
                notific_key="timestamp"
                notific_value="update"
                heading="Notification Alerts"
                sortedByKey={false}
                showDate={true}
                size={64}
                color="yellow"
              />
            </div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
