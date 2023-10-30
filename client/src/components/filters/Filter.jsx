import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCountriesByContinent, filterActivities,  getAllCountries, getAllActivities, filterByPopulation, getPages, sortBy} from "../../redux/actions";
import './Filter.css';

const Filters = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);

    const HandlerSort = e => {
        dispatch(sortBy(e.target.value, countries));
        dispatch(getPages(1));
    };
    const filterByContinent = e => {
        dispatch(filterCountriesByContinent(e.target.value,countries));
        dispatch(getPages(1));
    };
   

    const filterByActivity = e => {
        dispatch(filterActivities(e.target.value, countries));
        dispatch(getPages(1));
    };

    // const filterAZ = e => {
    //     dispatch(orderByName(e.target.value, countries));
    //     dispatch(getPages(1))
    // };

    // const filterASC = e => {
    //     dispatch(orderByPopulation(e.target.value, countries));
    //     dispatch(getPages(1));
    // };
    

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
                <option value='Antarctica' onClick={filterByContinent} >Antarctica</option>
            </select>

            <select onChange={filterByActivity} className="filter_select"> 
                    {/* <option>Filter By Activities</option> */}
                    {/* <option value="act">Con Actividades</option>
                    <option value="noA">Sin Actividades</option> */}
                    {activities.map((act) => {
                        return (
                            <option key={act.id} vlaue={act.name}>{act.name}</option>
                        )
                    })}
            </select>

            <select  onChange={HandlerSort}  className="filter_select" >
                <option value="All">SORT BY</option>
                <option value="ASC">A-Z</option>
                <option value="DES">Z-A</option>
            </select>

             <select  onChange={HandlerSort}  className="filter_select">
                <option value="All">Order by Population</option>
                <option value="POP+">HIGHER POPULATION</option>
                 <option value="POP-">LESSER POPULATION</option>
            </select>
                    
            <button onClick={e=> {filterByPop(e)}}>
                Countries greater than 10,000,000
                </button>

            <button onClick={handleClear}>CLEAR FILTERS</button>
        </div>
    )
};

export default Filters;