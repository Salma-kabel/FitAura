import './InfoUpdates.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import './InfoUpdates.css';

export default function InfoUpdates({ icon, title, pageLink, handleLink }) {

    return (
        <div className="info-updates">
            <div className="sec-icon">
                {icon}
            </div>
            <div className="discription">
                <span className="card-title">{title}</span>
            </div>
            <div className="view-details">
                {pageLink ? <a href={pageLink}><FontAwesomeIcon icon={fas.faArrowRight} /></a>
                : <FontAwesomeIcon onClick={handleLink} icon={fas.faArrowRight} />}
            </div>
        </div>
    );
}
