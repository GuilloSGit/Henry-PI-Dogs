import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions/index";
import styles from "./DogDetail.module.css";

export default function DogDetail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myDog = useSelector((state) => state.details);

  return (
    <Fragment>
      {myDog ? (
        <div key={myDog.id} className={styles.bodix}>
          <div className={styles.mainContainer}>
            <h2 className={styles.mainTitle}>{myDog.name}</h2>
            <img src={myDog.image} alt={myDog.name} className={styles.image}/>
            <div>
              <h4>Breed group:</h4>
              <p>{myDog.breed_group}</p>
            </div>
            <div>
              <h4>Temperament:</h4>
              <p>
                {!myDog.createdInDB
                  ? myDog.temperament
                  : myDog.temperaments.map((el) => el.name + " ")}
              </p>
            </div>
            <div>
              <h4>Life span:</h4>
              <p>{myDog.life_span}</p>
            </div>
            <div>
              <h4>Weight:</h4>
              <p>{myDog.weight_min}</p>
              <p>{myDog.weight_max}</p>
            </div>
            <div>
              <h4>Height:</h4>
              <p>{myDog.height_min}</p>
              <p>{myDog.height_max}</p>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
      <Link to="/home">
        <button>Back</button>
      </Link>
    </Fragment>
  );
}
