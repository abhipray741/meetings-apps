import React, { useState} from "react";
import { Link } from "react-router-dom";
import {logout} from "../Services/Auth";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./appNavbar.scss";

const AppNavbar = ({ isActive }) => {
    const [showNav,setShowNav]=useState(false);

    return (
        <nav className="main-menu">
            <div className="nav-mobile-view container d-space-between">
                <ul className="list-unstyled leftside">
                    <li className="d-flex space-between no-hover">
                        <span className="d-desktop-none">My Meetings</span>
                        <i
                            className="fas fa-bars fa-grey d-desktop-none"
                            id="menu-toggler"
                            onClick={()=>setShowNav(!showNav)}
                        ></i>
                    </li>
                    
                    <li className={`${isActive === "CALENDAR" && "active"} ${showNav && "d-mobile-block"}`}>
                        <Link to={"/calendar"}>Calendar</Link>
                    </li>
                    <li
                        className={` ${
                            isActive === "MEETINGS" && "active"
                        } sub-menu-wrapper ${(showNav && "d-mobile-block")}` }
                    >
                        <Link to={"/search-meet"}>
                            Meetings
                        </Link>
                    </li>

                    <li className={`${(isActive === "TEAMS" && "active")} ${(showNav && "d-mobile-block")}`}>
                        <Link to={"/teams"}>
                            Teams
                        </Link>
                    </li>
                    
                </ul>
                <ul className="list-unstyled list-inline rightside">
                    <li>
                        Hello&nbsp;
                        <a href="#email" id="user-email">
                              {localStorage.getItem("EMAIL")}
                        </a>
                    </li>
                    <li className={`${showNav&&"d-mobile-block"}`}>
                        <Link to={"/"} id="logout" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AppNavbar;
