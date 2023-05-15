import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Pagination, CountryCard,  NavBar, ErrorHandler, Loader } from '../../components/index.js';
import * as actions from '../../redux/actions/index.js';
import './Home.css';
import backgroundHome from '../../assets/Home.jpg';

const Home = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    // const countries = useSelector(state=>state.countries);
    const countriesSorted = useSelector(state => state.countriesSorted);
    const currentPages = useSelector(state => state.paginated);
    const error = useSelector(state => state.error);

    const lastCardIndex = currentPages * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = countriesSorted.slice(firstCardIndex, lastCardIndex);

    useEffect(()=>{
        setLoading(true);
        dispatch(actions.getAllCountries());
        setTimeout(()=>{
            setLoading(false);
        },2000);
    },[dispatch]);

    // let currentCards
    // if(countriesSorted.length > 0){
    //     currentCards = countriesSorted.slice(firstCardIndex,lastCardIndex);
    // }else{
    //     currentCards = countries.slice(firstCardIndex,lastCardIndex);
    // };
    
    return(
        <div className="home" style={{ backgroundHome: `url(${backgroundHome})` }}>
            <div className="home_navbar">
                <NavBar  setLoading={setLoading} />
            </div >
            <div className="home_container">
                <div className="home_countries">
                    {loading ? (
                        <Loader />
                    ) : error.length ? (
                        <ErrorHandler error={error} />
                    ) : (
                        currentCards?.map((country) => {
                            return(
                                <CountryCard 
                                    key={country.id}
                                    id={country.id}
                                    name={country.name}
                                    image={country.image}
                                    population={country.population}
                                    continent={country.continent}                               
                                />
                            )
                        })
                    )}
                </div>
            </div>
            {!error.length && (
                <Pagination 
                cardsPerPage={cardsPerPage}
                countriesSorted={countriesSorted.length}
                />
            )}
        </div>
    )
};

export default Home;

