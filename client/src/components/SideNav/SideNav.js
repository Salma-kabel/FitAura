import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faArrowRightToBracket, faAddressCard, faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import './SideNav.css';

export default function SideNav() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const burgerIcon = document.querySelector('.burgerIcon');
        if (burgerIcon) {
            burgerIcon.addEventListener("click", handleToggle);
        }
        return () => {
            if (burgerIcon) {
                burgerIcon.removeEventListener("click", handleToggle);
            }
        };
    });

    return (
        <div className={`sideNavigation ${isOpen ? 'open' : 'closed'}`}>
            <div>
                    <a  className="dashboard" href="/api/dashboard" target="_blank">
                        <FontAwesomeIcon className = "sideNavButtons" icon={faChartLine} />
                        Dashboard
                    </a>

                    <a className="login" href="/login" target="_blank">
                        <FontAwesomeIcon className = "sideNavButtons" icon={faArrowRightToBracket} />
                        Log in
                    </a>

                    <a className="register" href="/register" target="_blank">
                        <FontAwesomeIcon className = "sideNavButtons" icon={faAddressCard} />
                        Register
                    </a>

                    <a  className="" href="https://github.com/Salma-kabel/FitAura/tree/backend-dev" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon className = "sideNavButtons" icon={faCodeCompare} />
                        Repository
                    </a>

            </div>
        </div>
    );
}
