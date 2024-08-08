import React from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import Logo from "./Logo";
import Links from "../utils/links";
import Wrapper from "../assets/wrappers/SmallSidebar";

import { useDashboardContext } from "../pages/DashboardLayout";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {Links.map((link) => (
              <NavLink to={link.path} key={link.text} className="nav-link" end>
                <span className="icon">{link.icon}</span>
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
