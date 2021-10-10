import { React, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperaments,
  filterDogsByTemperament,
  orderByName,
  filterCreated,
  getBreeds,
  getDogsByBreed,
  filterDogsByMAXWeight,
  filterDogsByMINWeight
} from "../../redux/actions/index";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.allDogs);
  const breeds = useSelector((state) => state.breeds);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
    dispatch(getBreeds());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }
  function handleClickOrder(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }

  function handleFilteredByBreed(e) {
    e.preventDefault();
    dispatch(getDogsByBreed(e.target.value));
  }

  function handleFilteredMAXWeight(e) {
    e.preventDefault();
    dispatch(filterDogsByMAXWeight(e.target.value));
  }

  function handleFilteredMINWeight(e) {
    e.preventDefault();
    dispatch(filterDogsByMINWeight(e.target.value));
  }
  return (
    <Fragment>
      <div className={styles.side}>
        <div className={styles.sideBarHeader}>
          <h4 className={styles.header}> Find by filters:</h4>
          <div
            className={styles.tooltip}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <span className="material-icons refresh">loop</span>
            <span className={styles.tooltiptext}>
              🐕 Reset 🐕
              <br />
              selections
            </span>
          </div>
        </div>
        <hr />
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by name</h5>
          <select
            onChange={(e) => {
              handleClickOrder(e);
            }}
          >
            <option defaultValue value="all" hidden>
              Order
            </option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by source</h5>
          <select
            onChange={(e) => {
              handleFilterCreated(e);
            }}
          >
            <option defaultValue value="all">
              Source 🐶
            </option>
            <option value="created">Yours 🐶</option>
            <option value="inDB">dbase 🐶</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by temperament</h5>
          <select onChange={(e) => handleFilteredByTemp(e)}>
            <option value="all">All Temperaments</option>
            {temperaments.map((el) => {
              return (
                <option value={el.name} key={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by breed</h5>
          <select onChange={(e) => handleFilteredByBreed(e)}>
            <option value="all">All Breeds</option>
            {breeds.map((breed) => {
              return (
                <option value={breed} key={breed}>
                  {breed}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by max weight</h5>
          <select onChange={(e) => handleFilteredMAXWeight(e)}>
            <option value="all">All Weights</option>
            {
                allDogs.map((dog) =>{
                  return(
                    <option value={dog.weight_max} key={dog.id}>{dog.weight_max} kg</option>
                  )
                })
              }
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by min weight</h5>
          <select onChange={(e) => handleFilteredMINWeight(e)}>
            <option value="all">All Weights</option>
            {
                allDogs.map((dog) =>{
                  return(
                    <option value={dog.weight_min} key={dog.id}>{dog.weight_min} kg</option>
                  )
                })
              }
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Add a Woof</h5>
          <div className={styles.addDog}>
            <Link to="/dog" className={styles.tooltip}>
              <span className="material-icons">add_circle</span>
              <span className={styles.tooltiptext}>Add your Woof 🐕🐕🐕🐕</span>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
