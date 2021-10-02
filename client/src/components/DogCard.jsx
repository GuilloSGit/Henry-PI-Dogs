import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./DogCard.css";

export default function DogCard({ name, image, temperament, breed_group, id }) {
  return (
    <Fragment>
    <Link to={"/dogs/" + id}>
      <div className="dogCard">
        <div className="titleArea">
          <h4 className="dogName">{name}</h4>
        </div>
        <hr />
        <div className="infoArea">
          <div className="tempArea">
            <h5 className="dogTemp">Breed-group:  {breed_group}</h5>
          </div>
          <div className="imageArea">
            <img
              className="dogImage"
              src={image}
              alt={breed_group}
              height="120px"
            />
          </div>
        </div>
      </div>
    </Link>
    </Fragment>
  );
}
