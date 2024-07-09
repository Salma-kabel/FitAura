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
import DoughnutChart from "../charts/Doughnut"
import './Home.css';


const infoCardsList = [
    {
        id: 1,
        icon: (<FontAwesomeIcon icon={fas.faUserGroup}/>),
        title: "Create New Routine",
        pageLink: "/heros",
    },
    {
        id: 2,
        icon: (<FontAwesomeIcon icon={fas.faDollarSign}/>),
        title: "Your Body Informaion",
        pageLink: "/comp",
    },
];

export default function Home() {
    const { palette } = useTheme();
    const location = useLocation();
    const { email } = location.state || {};
    return (
        <div className="Home">
            <SideNav />
            <div className="home-content">
                <NavBar name={email}/>
                <div className="platform">
                    <div className="platform-info">
                        <section>
                            <h2>Weight</h2>
                            <LineChart 
                                height="300px"
                                color={[palette.primary.dark]}
                            />
                            <h2>Muscle And Fat Percentage</h2>
                            <LineChart2 
                                height="300px"
                                color={[palette.primary.dark, palette.primary.light]}
                            />
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
                                />
                                    );
                                })
                            }
                        </section>
                        <section className="products-table">
                            <ProductsCart />
                        </section>
                    </div>
                    <div className="platform-addons">
                        <section>
                        <h1 className="pie">Today's Workout</h1>
                            <DoughnutChart
                                height="300px"
                                color={[palette.primary.dark, palette.primary.light]}
                            />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
