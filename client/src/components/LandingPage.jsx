import React from "react";
import { Link } from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>Wellcome to Woof</h1>
            <Link to='/home'>
                <button>Let's Woof</button>
            </Link>
        </div>
    )
}