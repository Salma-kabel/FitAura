import React from "react";
import './InfoUpdates.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default function InfoUpdates({icon, title, pageLink}) {
    return(
        <div className="info-updates">
            <div className="sec-icon">
                {icon}
            </div>
            <div className="discription">
                <span className="card-title">{title}</span>
            </div>
            <div className="view-details">
                <a href={pageLink}><FontAwesomeIcon icon={fas.faArrowRight} /></a>
            </div>
        </div>
    );
}