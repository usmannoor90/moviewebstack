import React from "react";
import { NavLink } from "react-router-dom";

function Genere() {
  return (
    <div>
      <ul className="nav genere-list">
        <li>
          <NavLink
            className={(navlink) => (navlink.isActive ? "active" : "")}
            to="/home/Comedy"
          >
            comedy
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navlink) => (navlink.isActive ? "active" : "")}
            to="/home/Horror"
          >
            Horror
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navlink) => (navlink.isActive ? "active" : "")}
            to="/home/Romance"
          >
            Romance
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Genere;
