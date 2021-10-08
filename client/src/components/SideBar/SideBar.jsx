import { React, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperaments,
  filterDogsByTemperament,
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
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }
  function handleClickOrder(e){
    e.preventDefault();
    dispatch(orderByName());
  }
  
 /*  function handleFilterCreated(e){
    dispatch(filterCreated());
  } */
  
  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
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
            <span className={styles.tooltiptext}>Reset all</span>
          </div>
        </div>
        <hr />
        <div>
          <h6>Filter by name</h6>
          <select onChange={(e) => {
              handleClickOrder(e);
            }}>
            <option defaultValue value="all" hidden >Order</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
        <div>
          <h6>Filter by source</h6>
          <select>
            <option value="all">All 🐶</option>
            <option value="created">Yours 🐶</option>
            <option value="inDB">dbase 🐶</option>
          </select>
        </div>
        <div>
          <h6>Filter by temperament</h6>
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
        <div>
          <h6>Filter by breed</h6>
          <select>
            <option value="all">All Breeds</option>
            {breeds.map((breed) => {
              if (!breed) return (breed = "NOTHING");
              else
                return (
                  <option value={breed} key={breed}>
                    {breed}
                  </option>
                );
            })}
          </select>
        </div>
        <div>
          <h6>Filter by max weight</h6>
          <select>
            <option value="all">All Weights</option>
            {breeds.map((breed) => {
              if (!breed) return (breed = "NOTHING");
              else
                return (
                  <option value={breed} key={breed}>
                    {breed}
                  </option>
                );
            })}
          </select>
        </div>
        <div>
          <h6>Filter by min weight</h6>
          <select>
            <option value="all">All Weights</option>
            {breeds.map((breed) => {
              if (!breed) return (breed = "NOTHING");
              else
                return (
                  <option value={breed} key={breed}>
                    {breed}
                  </option>
                );
            })}
          </select>
        </div>
        <div>
          <h6>Add a Woof</h6>
          <Link to="/dog" className={styles.tooltip}>
            <span className="material-icons">add_circle</span>
            <span className={styles.tooltiptext}>Add your Woof 🐕</span>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
