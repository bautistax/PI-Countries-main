import React from "react";
import { Link } from 'react-router-dom';
import './CountryCard.css'
const CountryCard = ({ id, name, image, continent, population }) => {
    return (
        <div  className="card">
            <img src={image} alt={name + 'image'} className="card_img" />
            <div className="card_content">
                <Link to={`/countries/${id}`}>
                    <h1 className="h1">{name}</h1>
                    <h3 className="h3">{continent}</h3>
                    <h4 className="h4">{population.toLocaleString('es-ES')} 👫</h4>
                </Link>
            </div>
        </div>
    )
};

export default CountryCard;