import React from "react";
import { Link } from 'react-router-dom';
import './DogCard.css';

export default function DogCard({name, image, temperament, breed_group, id}) {
    return(
        <div key={ id } className="dogCard">
            <div className="titleArea">
                <Link to={"/dogs/" + id}>
                    <h4  className="dogName">{ name }</h4>
                </Link>
            </div>
            <hr />
            <div className="infoArea">
                <div className="tempArea">
                    <h5 className="dogTemp">{ temperament }</h5>
                </div>
                <div className="imageArea">
                    <img className="dogImage" src={image} alt={breed_group} height="150px"/>
                </div>
            </div>
        </div>
    )
};
