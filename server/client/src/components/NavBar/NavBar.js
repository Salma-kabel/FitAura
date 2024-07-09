import React from "react";
import './NavBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

function User({ userName }) {
    return(
        <span>
            Hi <strong>{userName}</strong> <FontAwesomeIcon icon={fas.faUser} />
        </span>
    );
}

export default function NavBar() {
    return (
        <div className="navigation-bar">
            <div className="profile-icons">
                <FontAwesomeIcon className="icon burgerIcon" icon={fas.faBars} />
                <FontAwesomeIcon className="icon" icon={fas.faEnvelope} />
                <FontAwesomeIcon className="icon" icon={fas.faWindowRestore} />
                <FontAwesomeIcon className="icon" icon={fas.faStar} />
            </div>
            <div className="general-icons">
                <FontAwesomeIcon className="icon" icon={fas.faMagnifyingGlass} />
                <FontAwesomeIcon className="icon" icon={fas.faBell} />
                <FontAwesomeIcon className="icon" icon={fas.faCartShopping} />
                <User userName="MAHMOUD"/>
            </div>
        </div>
    );
}

