import axios from 'axios';
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME';
export const CREATE_ACTIVITIES = 'CREATE_ACTIVITIES';
export const FILTER_COUNTRIES_BY_CONTINENT = 'FILTER_COUNTRIES_BY_CONTINENT';
export const FILTER_ACTIVITIES = 'FILTER_ACTIVITIES';
// export const FILTER_BY_AZ = 'FILTER_BY_AZ';
// export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const FILTER_BY_POPULATION = 'FILTER_BY_POPULATION';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const PAGINATED = 'PAGINATED'; 
export const SORT_BY = 'SORT_BY';

export const getAllCountries = () => {
    return async function (dispatch){
        const response = (await axios.get('/countries')).data;

        return dispatch({
            type: GET_ALL_COUNTRIES,
            payload: response
        });
    }
};

export const getCountryById = (id) => {
    return async function (dispatch){
        const response = (await axios.get(`/countries/${id}`)).data;

        return dispatch ({
            type: GET_COUNTRY_DETAIL,
            payload: response
        });
    }
};

export const getCountryByName = name => {
    return async function (dispatch){
        try {
            const response = (await axios.get(`/countries?name=${name}`)).data;

            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: response,
            });
        } catch (error) {
            console.log(error.message);
        };
       
    }
};

export const filterCountriesByContinent = (payload) => {
    return {
        type: FILTER_COUNTRIES_BY_CONTINENT,
        payload,
    }
};

export const getAllActivities = () => {
    return async function (dispatch){
        const dbActivities = (await axios.get('/activities')).data;

        return dispatch({ type: GET_ALL_ACTIVITIES, payload: dbActivities});
    };
};

export const createActivities = (payload) => {
    return async function (dispatch){
        const response = await axios.post(`/activities`, payload);
        return dispatch({
            type: CREATE_ACTIVITIES,
            payload: response.data
        });
    }
};

export const filterActivities = (payload) => {
    return {
        type: FILTER_ACTIVITIES,
        payload,
    }
};

// export const orderByName = (sort, countries) => {
//     return function (dispatch){
//         let countriesSorted = [...countries];
//         countriesSorted = countriesSorted.sort((a,b)=>{
//             if(a.name.toLowerCase() < b.name.toLowerCase())
//             return sort === 'AZ' ? -1 : 1
//             if(a.name.toLowerCase() > b.name.toLowerCase())
//             return sort === 'AZ' ? 1 : -1
//             return 0;
//         });
//         return dispatch({
//             type:FILTER_BY_AZ,
//             payload:countriesSorted,
//         });
//     }
// };

// export const orderByPopulation = (payload) => {
//     return {
//         type: ORDER_BY_POPULATION,
//         payload,
//     }
// };


export const filterByPopulation = (payload) => {
    return {
        type: FILTER_BY_POPULATION,
        payload
    }
    
};


export const clearFilters = countries =>{
    return {
        type: CLEAR_FILTERS,
        payload: countries
    }
};

export  const getPages = (payload) => {
    return {
        type: PAGINATED,
        payload
    }
};

export const sortBy = (payload) => {
    return {
        type: SORT_BY,
        payload
    }
}