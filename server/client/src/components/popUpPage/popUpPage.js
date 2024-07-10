import React from "react";
import './popUpPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";


const exercisesList = [
    {
        id: 1,
        name: "Squad",
    },
    {
        id: 2,
        name: "Push-ups",
    },
    {
        id: 3,
        name: "Pull-ups",
    },
    {
        id: 4,
        name: "Yoga",
    },
    {
        id: 5,
        name: "Rope",
    },
    {
        id: 6,
        name: "Rope",
    },
    {
        id: 7,
        name: "Rope",
    },
    {
        id: 8,
        name: "Rope",
    },
    {
        id: 9,
        name: "Rope",
    },
    {
        id: 10,
        name: "Rope",
    },
]

const choosedExersices = []

function InfoUpdates({ icon, title}) {

    function addExerciseHandling() {
        choosedExersices.push(title)
        console.log(choosedExersices)
        return(
            console.log(`Exercise ${title} added`)
        )
    }

    return (
        <div className="info-updates">
            <div className="sec-icon">
                {icon}
            </div>
            <div className="discription">
                <span className="card-title">{title}</span>
            </div>
            <div className = "exercise-add-button">
                <FontAwesomeIcon onClick = {addExerciseHandling} icon={fas.faSquarePlus} />
            </div>
        </div>
    );
}

export default function PopUpPage({handleLink}) {

    function onSubmitEx() {
        return(
            console.log("These will be added")
        )
    }

    return(
        <div className="popUp-pages">
            <div className="popup-main-page">
                <div className="popup-options">
                    {
                        exercisesList.map(({id, name}) => {
                            return(
                                <InfoUpdates key={id} title={name}/>
                            );
                        })
                    }
                    <button onClick={onSubmitEx} className="submit">Submit</button>
                </div>
                    <FontAwesomeIcon onClick={handleLink} className = "close-popup" icon={fas.faXmark} />
            </div>
        </div>
    );
}
