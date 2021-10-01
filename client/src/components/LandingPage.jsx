import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return(
        <Fragment>
            <div className="hero">
                <h1>Welcome to Woof</h1>
                <Link to='/home'>
                    <button className="bubbly-button">Let's Woof</button>
                </Link>
                <video autoPlay muted loop className="video-bg">
                    <source src="../movie.mp4" type="video/mp4"/>
                </video>
            </div>
        </Fragment>
    )
}