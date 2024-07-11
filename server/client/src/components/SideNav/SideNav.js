import React from "react";
import { useEffect } from "react";
import './SideNav.css'


export default function SideNav() {


    useEffect(() => {
        const burgerIcon = document.querySelector('.burgerIcon');
        const sideNav = document.querySelector('.sideNavigation');
        const handleClick = () => {
            if (sideNav.style.width === "20%") {
                sideNav.style.width = "0";
            } else {
                sideNav.style.width = "20%";
            }
        };

        if (burgerIcon) {
            burgerIcon.addEventListener("click", handleClick);
        }

        return () => {
            if (burgerIcon) {
                burgerIcon.removeEventListener("click", handleClick);
            }
        };
    }, []);

    return(
        <div className="sideNavigation" style={{width: "0px"}}>
            This is nav bar
        </div>
    );
}