import React, { useState, useEffect } from "react";
import { getCountryById } from '../../redux/actions/index.js';
import { Link,  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/index.js';
import './Detail.css';

const Details = () => {
    const { id } = useParams();

    const [ loading, setLoading ] = useState(false);
    
    const country = useSelector((state) => state.countryDetail);
    const dispatch = useDispatch();
    
     useEffect(()=>{
        setLoading(true);
        dispatch(getCountryById(id));
        setTimeout(()=>{
            setLoading(false);
        },1000);
    }, [dispatch, id]);

    return (
        <div className="detail">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="detail_head">
                        <Link to='/home'>
                            <div className="detail_back">
                                <span> Back To Home </span>
                            </div>
                        </Link>
                        <img src={country.image}  alt={`${country.name} flag`}/>
                        <h1>{country.name}</h1>
                        <div className="detail_content">
                            <h2>Capital: {country.capital}</h2>
                            <h2>Continent: {country.continent}</h2>
                            <h2>ID: {country.id} </h2>
                            <h2>Area: {country.area} km²</h2>
                            {country.subregion && <h2>Subregion : {country.subregion}</h2>}
                            {country.population && <h2>Population : {(country.population).toLocaleString('en').replace(/,/g, ".",)}</h2>}
                        </div>
                            <div className="activities">
                                {country.Activities && country.Activities.map((act) => {
                                    return (
                                        <div key={act.id} className="allAct">
                                            <div className="cardAct">
                                                <h1 className="cardText">Activity : {act.name}</h1>
                                                <h1 className="cardText">Difficulty : {act.difficulty}/5</h1>
                                                <h1 className="cardText">Duration : it takes {act.duration} hours</h1>
                                                <h1 className="cardText">Season : {act.season}</h1>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                    </div>
                </>
            )};
        </div>
    );
};

export default Details;