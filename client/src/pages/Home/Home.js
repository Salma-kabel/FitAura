import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideNav from "../../components/SideNav/SideNav";
import InfoUpdates from '../../components/InfoUpdates/InfoUpdates';
import RoutinesTable from "../../components/RoutinesTable/RoutinesTable";
import { useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import LineChart from "../charts/LineChart";
import LineChart2 from "../charts/LineChart2";
import { useSelector } from 'react-redux';
import './Home.css';
import PopUpPage, { finalchoosedExercises } from '../../components/popUpPage/popUpPage';

const infoCardsList = [
    {
        id: 1,
        icon: (<FontAwesomeIcon icon={fas.faUserGroup} />),
        title: "Create New Routine",
    },
    {
        id: 2,
        icon: (<FontAwesomeIcon icon={fas.faChildReaching} />),
        title: "Your Body Informaion",
        pageLink: "/getinformation",
    },
];

export default function Home() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [routines, setRoutines] = useState([]);

    const user = useSelector((state) => state.user);

    useEffect(() => {
        const storedRoutines = localStorage.getItem("Routines List");
        if (storedRoutines) {
            setRoutines(JSON.parse(storedRoutines));
        }
    }, []);

    const handleClick = () => {
        setIsPopUpVisible(!isPopUpVisible);
    };

    const handleSubmitRoutine = () => {
        setIsPopUpVisible(!isPopUpVisible);
        let newRoutineName = document.querySelector(".input-routine-name").value;

        const newRoutine = {
            id: routines.length ? routines[routines.length - 1].id + 1 : 1,
            RoutineName: newRoutineName,
            counts: finalchoosedExercises.length,
            exercises: finalchoosedExercises
        };

        const updatedRoutines = [...routines, newRoutine];
        setRoutines(updatedRoutines);
        localStorage.setItem("Routines List", JSON.stringify(updatedRoutines));
    };

    const { palette } = useTheme();

    return (
        <div className="Home">
            <SideNav />
            <div className="home-content">
                {isPopUpVisible && (
                    <PopUpPage handleLink={handleClick} handleSubmitRoutine={handleSubmitRoutine} />
                )}
                <NavBar name={user?.username || 'Guest'} />
                <div className="platform">
                    <div className="platform-info">
                        <section className="charts">
                            <div className="weight-chart">
                                <h2>Weight</h2>
                                <LineChart
                                    height="300px"
                                    color={[palette.primary.dark]}
                                />
                            </div>

                            <div className="muscle-chart">
                                <h2>Muscle And Fat Percentage</h2>
                                <LineChart2
                                    height="300px"
                                    color={[palette.primary.dark, palette.primary.light]}
                                />
                            </div>
                        </section>

                        <section className="info">
                            {infoCardsList.map(({ id, icon, title, pageLink }) => (
                                <InfoUpdates
                                    key={id}
                                    icon={icon}
                                    title={title}
                                    pageLink={pageLink}
                                    handleLink={handleClick}
                                />
                            ))}
                        </section>
                        <section className="RoutinesTable-organization">
                            <RoutinesTable routines={routines} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
