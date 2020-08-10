import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotifyMe from "react-notification-timeline";

class Navbar extends Component {
  render() {
    const data = [
      {
        update: "70 new employees are shifted",
        timestamp: 1596119688264,
      },
      {
        update: "Time to take a Break, TADA!!!",
        timestamp: 1596119686811,
      },
      {
        update: "Time to take a Break, TADA!!!",
        timestamp: 1596119686811,
      },
    ];
    return (
      <nav>
        <div class="nav-wrapper">
          {/* <a href="#" class="brand-logo right">
            Logo
          </a> */}
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li>
              <a href="/dashboard">Forms</a>
            </li>
            <li>
              <a href="/login">Pending</a>
            </li>
            <li>
              <a href="collapsible.html">Approved</a>
            </li>
            <li>
              <a href="collapsible.html">Rejected</a>
            </li>
            <li class="brand-logo right" >
            <NotifyMe
              data={data}
              storageKey="notific_key"
              notific_key="timestamp"
              notific_value="update"
              heading="Notification Alerts"
              sortedByKey={false}
              showDate={true}
              size={24}
              color="#fff"
            />
            </li>
          </ul>
        </div>
      </nav>
      // <div className="navbar-fixed">
      //   <nav className="z-depth-0">
      //     <div className="nav-wrapper white">
      //       <Link
      //         to="/"
      //         style={{
      //           fontFamily: "monospace"
      //         }}
      //         className="col s5 brand-logo black-text"
      //       >
      //         <i className="material-icons">code</i>
      //         MERN
      //       </Link>
      //       <div className="col s4 brand-logo right black-text">
      //       <NotifyMe
      //         data={data}
      //         storageKey="notific_key"
      //         notific_key="timestamp"
      //         notific_value="update"
      //         heading="Notification Alerts"
      //         sortedByKey={false}
      //         showDate={true}
      //         size={64}
      //         color="yellow"
      //       />
      //       </div>
      //     </div>
      //   </nav>
      // </div>
    );
  }
}

export default Navbar;
