import React from "react";
import { clearFilters } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from 'react-redux';

const ErrorHandler = ({ error }) => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const handleBack = () => {
        dispatch(clearFilters(countries));
    };
    return (
        <div>
            <h1>Error</h1>
            <p>{error}</p>
            <button onClick={handleBack}>Back</button>
        </div>
    )
};

export default ErrorHandler;
