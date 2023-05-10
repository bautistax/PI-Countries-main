import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCountriesByContinent, filterActivities, orderByName, orderByPopulation, getAllCountries, getAllActivities, filterByPopulation } from "../../redux/actions";
import './Filter.css';

const Filters = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);

    const filterByContinent = e => {
        dispatch(filterCountriesByContinent(e.target.value,countries));
    };
   

    const filterByActivity = e => {
        dispatch(filterActivities(e.target.value, countries));
    };

    const filterAZ = e => {
        dispatch(orderByName(e.target.value, countries));
    };

    const filterASC = e => {
        dispatch(orderByPopulation(e.target.value, countries));
    };

    const filterByPop = e => {
        dispatch(filterByPopulation(e.target.value, countries));
    };

    useEffect(()=> {
        dispatch(getAllActivities());
    }, [dispatch]);

    const handleClear = () => {
       dispatch(getAllCountries());
    };

    return (
        <div className="filter">
            <select onChange={filterByContinent} className="filter_select" >
                <option key='none' value='All' className="select">Continents</option>
                <option value='Africa' onClick={filterByContinent} className="select">Africa</option>
                <option value='Asia' onClick={filterByContinent} >Asia</option>
                <option value='Europe' onClick={filterByContinent} >Europe</option>
                <option value='Oceania' onClick={filterByContinent} >Oceania</option>
                <option value='North America' onClick={filterByContinent} >North America</option>
                <option value='South America' onClick={filterByContinent} >South America</option>
                <option value='Antartica' onClick={filterByContinent} >Antartica</option>
            </select>

            <select onChange={e=> filterByActivity(e)} className="filter_select"> 
                    <option value="all">Filter By Activities</option>
                    <option value="act">Con Actividades</option>
                    <option value="noA">Sin Actividades</option>
                </select>

            <select  onChange={filterAZ} className="filter_select">
                <option value="All">Filter Alphabetically</option>
                <option value='AZ' >A-Z</option>
                <option value='ZA' >Z-A</option>
            </select>

            <select  onChange={filterASC} className="filter_select">
                <option value="All">Order By Population</option>
                <option value="POP+" > Highest </option>
                <option value="POP-"> Lower </option>
            </select>
            <button onClick={e=> {filterByPop(e)}}>
                Countries greater than 10,000,000
                </button>

            <button onClick={handleClear}>CLEAR FILTERS</button>
        </div>
    )
};

export default Filters;