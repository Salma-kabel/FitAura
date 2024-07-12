import React from "react";
import './RoutinesCell.css'

export default function RoutinesCell({routineName, count, editButton, deleteButton}) {
    return(
        <tr className="routine-cell">
            <th>
                <div>{routineName}</div>
            </th>
            <th>
                <div>{count}</div>
            </th>
            <th className="edit-buttons">
                <div className="edit-button">{editButton}</div>
                <div className="edit-button">{deleteButton}</div>
            </th>
        </tr>
    );
}
