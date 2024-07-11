import NavBar from "../../components/NavBar/NavBar";
import SideNav from "../../components/SideNav/SideNav";
import InfoUpdates from '../../components/InfoUpdates/InfoUpdates';
import ProductsCart from "../../components/productsCart/productsCart";
import { useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import LineChart from "../charts/LineChart"
import LineChart2 from "../charts/LineChart2";
import { useSelector } from 'react-redux';
// import DoughnutChart from "../charts/Doughnut";
import './Home.css';
import React, { useEffect, useState } from "react";
import PopUpPage, { choosedExersices } from '../../components/popUpPage/popUpPage';



const infoCardsList = [
    {
        id: 1,
        icon: (<FontAwesomeIcon icon={fas.faUserGroup}/>),
        title: "Create New Routine",
        // pageLink: "/heros",
    },
    {
        id: 2,
        icon: (<FontAwesomeIcon icon={fas.faDollarSign}/>),
        title: "Your Body Informaion",
        // pageLink: "/comp",
    },
];

export default function Home() {

    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const user = useSelector((state) => state.user);
    const handleClick = () => {
        // setIsPopUpVisible(isPopUpVisible);
        setIsPopUpVisible(!isPopUpVisible);
    };
    // const Getuserdata = async () => {
    //     const id = user.id;
    //       try {
    //           const res = await fetch("http://localhost:5000/api/user", {
    //               method: 'POST',
    //               headers: {
    //                   'Content-Type': 'application/json',
    //               },
    //               body: JSON.stringify({id: id}),
    //           });
    //           usero = await res.json();
    //       } catch (error) {
    //           console.log(error);
    //       }
    // }
    const handleSubmitRoutine = () => {
        // setIsPopUpVisible(isPopUpVisible);
        setIsPopUpVisible(!isPopUpVisible);

        console.log(`Routine: ${document.querySelector(".input-routine-name").value}`)
        console.log(`These exercise will be added: ${choosedExersices}`);
    };

    const { palette } = useTheme();
    
    return (
        <div className="Home">
            <SideNav />
            <div className="home-content">
            {isPopUpVisible && (
                    <PopUpPage handleLink = {handleClick} handleSubmitRoutine = {handleSubmitRoutine}/>
            )}
                <NavBar name={user?.username || 'Guest'}/>
                <div className="platform">
                    <div className="platform-info">

                        <section className="charts">

                            <div className="weight-chart">
                                <h2>Weight</h2>
                                <LineChart 
                                    height="300px"
                                    color={[palette.primary.dark]}
                                    weight={user.weight}
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
                            {
                                infoCardsList.map(({id, icon, title, pageLink}) => {
                                    return(
                                        <InfoUpdates
                                            key = {id}
                                            icon = {icon}
                                            title = {title}
                                            pageLink={pageLink}
                                            handleLink = {handleClick}
                                />
                                    );
                                })
                            }
                        </section>

                        <section className="products-table">
                            <ProductsCart />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
