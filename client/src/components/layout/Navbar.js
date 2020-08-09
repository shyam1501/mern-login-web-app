import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotifyMe from "react-notification-timeline";

class Navbar extends Component {
  render() {
    const data = [
      {
        "update":"70 new employees are shifted",
        "timestamp":1596119688264
      },
      {
        "update":"Time to take a Break, TADA!!!",
        "timestamp":1596119686811
      },
      {
        "update":"Time to take a Break, TADA!!!",
        "timestamp":1596119686811
      }
    ];
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              MERN
            </Link>
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
        </nav>
      </div>
    );
  }
}

export default Navbar;
