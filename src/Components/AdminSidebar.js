import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/AdminSidebar.css"
const AdminSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenRole, setIsDropdownOpenRole] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownClickRole = () => {
    setIsDropdownOpenRole(!isDropdownOpenRole);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <ul className="sidebar-menu" style={{marginTop:60}}>
         
          <li className="sidebar-menu-item">
            <a  type="button"    onClick={handleDropdownClick}>
             Authorization
            </a>
            {isDropdownOpen && (
              <ul className="sidebar-dropdown">
                <li>
                  <Link to="/createauth">Create Authorization</Link>
                </li>
                <li>
                  <Link to="/craeteweb">Create Web Screen</Link>
                </li>
                <li>
                  <Link to="/createmobile">Create Mobile Screen</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="sidebar-menu-item">
            <a type="button"  onClick={handleDropdownClickRole}>
             Create Role
            </a>
            {isDropdownOpenRole && (
              <ul className="sidebar-dropdown">
                <li>
                  <Link to="/createrole">Create Role</Link>
                </li>
                <li>
                  <Link to="/assignrole">Assign</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
