import React from "react";
import { Filters, SearchBar } from '../index.js';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ setCurrentPage, setLoading }) => {
    return (
        <div className="navbar">
            <Link to="/home" className="home_button">Home</Link>
            <div className="navbar_header">
                <SearchBar setCurrentPage={setCurrentPage} setLoading={setLoading} />
            </div>
                <div className="navbar_create_button">
                    <Link to='/create'><span>CREATE ACTIVITY</span></Link>
                </div>
            <div className="navbar_form">
                <Filters />
            </div>
        </div>
    )
};
export default NavBar;