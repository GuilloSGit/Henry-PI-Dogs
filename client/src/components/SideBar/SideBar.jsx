import { React, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperaments,
  getBreeds,
  filterDogsByTemperament,
  filterDogsByBreed,
  getfilterCreated,
  orderByName,
} from "../../redux/actions/index";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
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

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }

  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(getfilterCreated(e.target.value));
  }

  function handleFilteredByBreed(e) {
    e.preventDefault();
    dispatch(filterDogsByBreed(e.target.value));
  }

  return (
    <Fragment>
      <div className={styles.nav}>
        <div className={styles.sideBarHeader}>
          <h4> Find by filters:</h4>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Refresh
          </button>
        </div>
        <hr />
        <div>
          <h6>Filter by name</h6>
          <select onChange={(e) => handleSort(e)}>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
        <div>
          <h6>Filter by temperament</h6>
          <select onChange={(e) => handleFilteredByTemp(e)}>
            <option value="all">All Temperaments</option>
            {temperaments.map((temperament) => {
              return (
                <option value={temperament} key={temperament}>
                  {temperament}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h6>Filter by breed</h6>
          <select onChange={(e) => handleFilteredByBreed(e)}>
            <option value="all">All Breeds</option>
            {breeds.map((breed) => {
              if (!breed) return (breed = "NOTHING");
              else return <option value={breed} key={breed}>{breed}</option>;
            })
            }
          </select>
        </div>
        <div>
          <h6>Filter by source</h6>
          <select onChange={(e) => handleFilterCreated(e)}>
            <option value="all">All 🐶</option>
            <option value="created">Yours 🐶</option>
            <option value="inDB">dbase 🐶</option>
          </select>
        </div>
        {/* <div>
          <h6>Filter by max weight</h6> 
          <select onChange={(e) => handleFilteredByBreed(e)}>
            <option value="all">All Weights</option>
            {breeds.map((breed) => {
              if (!breed) return (breed = "NOTHING");
              else return <option value={breed} key={breed}>{breed}</option>;
            })
            }
          </select>
        </div>
        <div>
          <h6>Filter by min weight</h6> 
          <select onChange={(e) => handleFilteredByBreed(e)}>
            <option value="all">All Weights</option>
            {breeds.map((breed) => {
              if (!breed) return (breed = "NOTHING");
              else return <option value={breed} key={breed}>{breed}</option>;
            })
            }
          </select>
        </div> */}
        <div>
          <Link to="/dog">
            <button>Create a dog</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
