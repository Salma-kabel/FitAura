import NavBar from "../../components/NavBar/NavBar";
import SideNav from "../../components/SideNav/SideNav";
import InfoUpdates from '../../components/InfoUpdates/InfoUpdates';
import ProductsCart from "../../components/productsCart/productsCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import './Home.css';


const infoCardsList = [
    {
        id: 1,
        icon: (<FontAwesomeIcon icon={fas.faUserGroup}/>),
        title: "New Leads",
        statistics: "3050",
        pageLink: "/heros",
    },
    {
        id: 2,
        icon: (<FontAwesomeIcon icon={fas.faDollarSign}/>),
        title: "This week Sales",
        statistics: "$18,500",
        pageLink: "/comp",
    },
    {
        id: 3,
        icon: (<FontAwesomeIcon icon={fas.faShop} />),
        title: "Inventory Status",
        statistics: "8.5% Stock Surplus",
        pageLink: "newSUb",
    },
    {
        id: 4,
        icon: (<FontAwesomeIcon icon={fas.faCartShopping}/>),
        title: "Orders to deliver",
        statistics: "305 Orders",
        pageLink: "cart",
    },
];

export default function Home() {

    return (
        <div className="Home">
            <SideNav />
            <div className="home-content">
                <NavBar />
                <div className="platform">
                    <div className="platform-info">
                        <section className="info">
                            {
                                infoCardsList.map(({id, icon, title, statistics, pageLink}) => {
                                    return(
                                        <InfoUpdates
                                            key = {id}
                                            icon = {icon}
                                            title = {title}
                                            statistics = {statistics}
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
                        addonns
                    </div>
                </div>
            </div>
        </div>
    );
}
