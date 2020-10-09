import React, { useEffect, useState } from "react";
import "./Nav.css";
import logo from "../../images/moviez-logo.png";

export default function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="trailer house logo" />
      <div className="user__buttons">
        <button className="user__button">Login</button>
        <button className="user__button">Register</button>
      </div>
    </div>
  );
}
