import React from "react";
import './popUpPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faXmark } from "@fortawesome/free-solid-svg-icons";

let choosedExersices = [];
const exercisesList = [
    { id: 1, name: "Squad" },
    { id: 2, name: "Push-ups" },
    { id: 3, name: "Pull-ups" },
    { id: 4, name: "Yoga" },
    { id: 5, name: "Dancing" },
    { id: 6, name: "Running" },
    { id: 7, name: "Hopping" },
    { id: 8, name: "Wrisling" },
    { id: 9, name: "Gym" },
    { id: 10, name: "Meditation" },
];

function removeElement(arr, ele) {
    const newArr = arr.filter((element) => {
        return element !== ele;
    });
    return newArr;
}

function InfoUpdates({ icon, title }) {
    function addExerciseHandling(e) {
        if (choosedExersices.includes(title) && e.target.style.color === "green") {
            choosedExersices = removeElement(choosedExersices, title);
            e.target.style.color = "rgb(54, 54, 54)";
            console.log("Exercise removed");
        } else {
            choosedExersices.push(title);
            e.target.style.color = "green"
            console.log(`Exercise ${title} added`);
        }
        console.log(choosedExersices);
    }

    return (
        <div className="info-updates">
            <div className="sec-icon"> {icon} </div>
            <div className="discription">
                <span className="card-title">{title}</span>
            </div>
            <div className="exercise-add-button">
                <FontAwesomeIcon onClick={addExerciseHandling} icon={faSquarePlus} />
            </div>
        </div>
    );
}

export default function PopUpPage({ handleLink, handleSubmitRoutine }) {
    return (
        <div className="popUp-pages">
            <div className="popup-main-page">
                <div className="popup-options">

                    <input type="text" placeholder="Enter your routine name" className="input-routine-name" id="input-routine-name"></input>

                    {exercisesList.map(({ id, name }) => {
                        return (
                            <InfoUpdates key={id} title={name} />
                        );
                    })}
                </div>
                <button onClick={handleSubmitRoutine} className="submit">Submit</button>
                <FontAwesomeIcon onClick={handleLink} className="close-popup" icon={faXmark} />
            </div>
        </div>
    );
}

export { choosedExersices };
