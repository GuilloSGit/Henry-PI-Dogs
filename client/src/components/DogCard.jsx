import React from "react";

export default function DogCard({name, image, temperament, breed_group, id}) {
    return(
        <div key={ id }>
            <h3>{ name }</h3>
            <h5>{ temperament }</h5>
            <img src={image} alt={breed_group} width="200px" height="150px"/>
        </div>
    )
};
