import React from "react";
import { Link } from "react-router-dom";
import './Landing.css';
import background from '../../assets/real.gif';

const Landing = () => {
    return (
        <div className="landing-container" >
            <div className="landing-content" style={{ background: `url(${background})` }}>
                <div className="button-container">
                    <Link to= '/home'><button className="landing-button">Home</button></Link>
                </div>
            </div>
        </div>
    )
};

export default Landing;