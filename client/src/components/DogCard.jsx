import React from "react";
import { Link } from 'react-router-dom';

export default function DogCard({name, image, temperament, breed_group, id}) {
    return(
        <div key={ id }>
            <Link to={"/dogs/" + id}>
                <h3>{ name }</h3>
            </Link>
            <h5>{ temperament }</h5>
            <img src={image} alt={breed_group} width="200px" height="150px"/>
        </div>
    )
};
