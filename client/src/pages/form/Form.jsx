import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, createActivities } from "../../redux/actions";
import { Link } from "react-router-dom";
import './Form.css';
import formImage from '../../assets/Form.jpg';

const Create = () => {
    const countries = useSelector(state => state.countriesSorted).sort((a,b)=>{
        if(a.name < b.name) {
            return -1;
        }
        if(a.name > b.name) {
            return 1;
        }
        return 0;
    });

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getAllCountries());
    },[dispatch]);

    const [form, setForm] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        CountryId: [],
        season: "",
    });

    const [error, setError] = useState({});

    const deleteImageHnadler = id => {
        const countriesFilter = form.CountryId.filter(cts => cts !== id)
        setForm({...form, CountryId: countriesFilter})
        setNames(names.filter(cts => cts.id !== id))
    };

    const changeInputHandler = e => {
        const property = e.target.name;
        const value = e.target.value;

        setForm({...form, [property]: value});
        validator({...form, [property]: value});
    };

    const [names, setNames] = useState([]);

    const selectCountryHandler = e => {
        const selectCountry = countries.find(i => i.id === e);
        setNames([...names, selectCountry]);
        setForm({...form, CountryId: [...form.CountryId, e]});
        validator({...form, CountryId: [...form.CountryId, e]});
    };

   const selectDifficultyHandler = e => {
        setForm({...form, difficulty: Number(e.target.value)});
        validator({...form, difficulty: Number(e.target.value)});
    };

    const selectDurationHandler = e => {
        setForm({...form, duration: Number(e.target.value)});
        validator({...form, duration: Number(e.target.value)});
    };

    const selectSeasonHandler = e => {
        setForm({...form, season: e.target.value});
        validator({...form, season: e.target.value});
    };

    const handleSubmit = () => {
        dispatch(createActivities(form));
        alert(`You have been created the new activity ${form.name}`)
        setForm({
            name: '',
            difficulty: null,
            duration: null,
            CountryId: [],
            season: '',
        });
    };
   const selectDuration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
   const selectDifficulty = [1, 2, 3, 4, 5];

   useEffect(() => {
    setError(validator(form));
   }, [form]);

   const validator = (form) => {
    const errors = {};
    if (!form.name) {
        errors.name = 'Name is required'
    }
    if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.name)) { 
        errors.name = 'Invalid Name' //Se utiliza para validar que el campo de entrada name solo contenga letras y espacios en blanco
    }
    if (!form.duration || form.duration < 1) {
        errors.duration = 'Duration is required'
    }
    if (!form.difficulty) {
        errors.difficulty = 'Difficulty is required'
    }
    if (!form.season) {
        errors.season = 'You must select one season'
    }
    if (!form.CountryId.length) {
        errors.CountryId = 'You must select at least one country'
    }
    return errors
   };

   const filteredCountriesMap = countries.filter((country) => !form.CountryId.includes(country.id));

   return (
    <form onSubmit={handleSubmit} className="create">
        <div style={{ formImage: `url(${formImage})` }}>
            <div className="create_head">
                <Link to='/home'>Back to Home</Link>
            </div>
            <div>
                <span className="inputs">Activity name</span><br/>
                <input placeholder={error.name && "NAME IS REQUIRED"} name="name" type="text" autoComplete="off"
                className="create_input_name" 
                value={form.name} onChange={changeInputHandler} />
                {error.name === 'Name is invalid' && <span className="danger">NAME IS INVALID</span>}
            </div>
            <span className="inputs">Difficulty</span>
            <div>
                <select onChange={selectDifficultyHandler} className="create_input">
                    <option  value='' hidden>{error.difficulty && "DIFFICULTY IS REQUIRED"}</option>
                    {selectDifficulty.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>
            <span className="inputs">Duration</span>
            <div>
                <select onChange={selectDurationHandler} className="create_input">
                    <option value='' hidden>{error.duration && "DURATION IS REQUIRED"}</option>
                    {selectDuration.map(i => <option key={i} name='duration' value={i}>{i}</option>)}
                </select>
            </div>
            <span className="inputs">Country</span>
            <div>
                <select onChange={(e) => selectCountryHandler(e.target.value)} className="create_input">
                    <option value='' hidden>{error.CountryId ? 'COUNTRY IS REQUIRED' : 'SELECT COUNTRY'}</option>
                    {filteredCountriesMap?.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
            </div>
            <span className="inputs">Season</span>
            <div>
                <select onChange={selectSeasonHandler} className="create_input">
                    <option value='' hidden>{error.season && 'SEASON IS REQUIRED'}</option>
                    <option name="Summer" value="Summer">Summer</option>
                    <option name="Fall" value="Fall">Fall</option>
                    <option name="Winter" value="Winter">Winter</option>
                    <option name="Spring" value="Spring">Spring</option>
                </select>
            </div>
            <div className="buttonContainer">
                {Object.entries(error).length === 0 && <button type="submit" className="button">Add New Activity</button>}
            </div>
        </div>
        <div className="countriesFlags">
            {names.map(c =>
                <div key={c.id}>
                    <button onClick={() => deleteImageHnadler(c.id)} className="deleteButton">X</button>
                    <img className="flags" src={c.image} alt={c.name} />
                </div>
                )};
        </div>
    </form>
   )
};

export default Create;
