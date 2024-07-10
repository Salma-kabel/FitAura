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

export default function NavBar({name}) {
    return (
        <div className="navigation-bar">
            <div className="profile-icons">
                <FontAwesomeIcon className="icon burgerIcon" icon={fas.faBars} />
                <FontAwesomeIcon className="icon" icon={fas.faStar} />
            </div>
            <div className="general-icons">
                <FontAwesomeIcon className="icon" icon={fas.faMagnifyingGlass} />
                <FontAwesomeIcon className="icon" icon={fas.faBell} />
                <User userName={name}/>
            </div>
        </div>
    );
}

