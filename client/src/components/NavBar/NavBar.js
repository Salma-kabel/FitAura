import React from "react";
import './NavBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faStar, faBars, faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import { components } from 'react-select';

const IconOption = (props) => (
    <components.Option {...props}>
        {props.data.icon && <FontAwesomeIcon icon={props.data.icon} style={{ marginRight: 10}} />}
        {props.data.label}
    </components.Option>
);

function User({ userName }) {
    const options = [
        { value: '', label: `Hi ${userName}`, icon: faUser, isDisabled: true },
        { value: 'option1', label: <a style = {{ textDecoration: "none", textAlign: "center"}} href='/login'>Log out</a>, icon: faRightFromBracket},
    ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? 'transparent' : provided.borderColor,
            boxShadow: state.isFocused ? 'none' : provided.boxShadow,
            '&:hover': {
                borderColor: state.isFocused ? 'transparent' : provided.borderColor,
            },
        }),
    };

    return (
        <Select
            options={options}
            components={{ Option: IconOption }}
            defaultValue={options[0]}
            isOptionDisabled={(option) => option.isDisabled}
            styles={customStyles}
        />
    );
}

export default function NavBar({name}) {
    return (
        <div className="navigation-bar">
            <div className="profile-icons">
                <FontAwesomeIcon className="icon burgerIcon" icon={faBars} />
                <FontAwesomeIcon className="icon" icon={faStar} />
            </div>
            <div className="general-icons">
                <FontAwesomeIcon className="icon search-icon" icon={faMagnifyingGlass} />
                <FontAwesomeIcon className="icon" icon={faBell} />
                <User userName={name}/>
            </div>
        </div>
    );
}

