import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../redux/actions/index.js';
import './SearchBar.css';

const SearchBar = ({  setLoading }) => {
    const [countries, setCountries] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handleSearch = e => {
        e.preventDefault();
        if(!countries || countries === ''){
            setError(true)
            return
        }
        setError(false);
        dispatch(getCountryByName(countries));
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },1000);
        setCountries('');
    };
    const onChangeInput = e => {
        setCountries(e.target.value);
    };
    return (
        <div className="search">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search..." onChange={onChangeInput} name="name" 
                   className={error ? 'error' : ''} value={countries} />
                   <button type="submit" className={error ? 'error' : ''}>Submit</button>
            </form>
        </div>
    )
};

export default SearchBar;