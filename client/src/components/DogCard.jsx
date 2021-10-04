import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";

export default function DogCard({ id, name, image, breed_group }) {
  return (
    <Fragment>
      <div className={styles.dogCard}>
        <Link to={"/dogs/" + id}>
          <div className={styles.titleArea}>
            <h4 className={styles.dogName}>{name}</h4>
          </div>
          <hr />
          <div className={styles.infoArea}>
            <div className={styles.tempArea}>
              {breed_group ? <h5 className={styles.dogTemp}>Breed-group: {breed_group}</h5>
               : <br />
              }
            </div>
            <div className={styles.imageArea}>
              <img
                className={styles.dogImage}
                src={image}
                alt={breed_group}
                height="140px"
              />
            </div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
}
