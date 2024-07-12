import React from "react";
import './RoutinesTable.css';
import RoutinesCell from "./Routines/RoutinesCell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const editButton = <FontAwesomeIcon className="modify-routine-edit" icon={faPen} />;
const deleteButton = <FontAwesomeIcon className="modify-routine-delete" icon={faTrash} />;

export default function RoutinesTable({ routines }) {
    const routineList = routines.map((routine) => ({
        id: routine.id,
        routineName: routine.RoutineName,
        count: routine.counts,
        exercises: routine.exercises,
        editButton: editButton,
        deleteButton: deleteButton
    }));

    return (
        <div className="RoutineTableContainer">
            <h1>Your Routines</h1>
            <div className="routines-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Exercises Count</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routineList.map(({ id, routineName, count, editButton, deleteButton }) => (
                            <RoutinesCell
                                key={id}
                                routineName={routineName}
                                count={count}
                                editButton={editButton}
                                deleteButton={deleteButton}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

