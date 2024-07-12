import React, { useState } from "react";
import './popUpPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faXmark } from "@fortawesome/free-solid-svg-icons";

let finalchoosedExercises = []
const exercisesList = [
    { id: 1, name: "Squad" },
    { id: 2, name: "Push-ups" },
    { id: 3, name: "Pull-ups" },
    { id: 4, name: "Yoga" },
    { id: 5, name: "Dancing" },
    { id: 6, name: "Running" },
    { id: 7, name: "Hopping" },
    { id: 8, name: "Wrestling" },
    { id: 9, name: "Gym" },
    { id: 10, name: "Meditation" },
];

function ExercisesForRoutines({ icon, title, choosedExercises, setChoosedExercises }) {
    const isChosen = choosedExercises.includes(title);

    const addExerciseHandling = () => {
        if (isChosen) {
            setChoosedExercises(prevExercises => {
                const updatedExercises = prevExercises.filter(exercise => exercise !== title);
                // console.log(`Exercise ${title} removed`);
                // console.log(updatedExercises); // Log the updated state
                finalchoosedExercises = updatedExercises;
                return updatedExercises;
            });
        } else {
            setChoosedExercises(prevExercises => {
                const updatedExercises = [...prevExercises, title];
                // console.log(`Exercise ${title} added`);
                // console.log(updatedExercises);
                finalchoosedExercises = updatedExercises;
                return updatedExercises;
            });
        }
    };

    return (
        <div className="info-updates">
            <div className="sec-icon"> {icon} </div>
            <div className="discription">
                <span className="card-title">{title}</span>
            </div>
            <div className={`exercise-add-button ${isChosen ? 'green' : 'gray'}`} onClick={addExerciseHandling}>
                <FontAwesomeIcon icon={faSquarePlus} />
            </div>
        </div>
    );
}

export default function PopUpPage({ handleLink, handleSubmitRoutine }) {
    const [choosedExercises, setChoosedExercises] = useState([]);

    return (
        <div className="popUp-pages">
            <div className="popup-main-page">
                <div className="popup-options">
                    <input type="text" placeholder="Enter your routine name" className="input-routine-name" id="input-routine-name"></input>

                    {exercisesList.map(({ id, name }) => {
                        return (
                            <ExercisesForRoutines
                                key={id}
                                title={name}
                                choosedExercises={choosedExercises}
                                setChoosedExercises={setChoosedExercises}
                            />
                        );
                    })}
                </div>
                <button onClick={handleSubmitRoutine} className="submit">Submit</button>
                <FontAwesomeIcon onClick={handleLink} className="close-popup" icon={faXmark} />
            </div>
        </div>
    );
}

export { finalchoosedExercises };
