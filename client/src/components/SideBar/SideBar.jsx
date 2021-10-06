import {React,  Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, filterDogsByTemperament } from "../../redux/actions/index";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
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
          <select name="" id="">
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
          </select>
        </div>
        <div>
          <h6>Filter by temperament</h6>
          <select onChange={(e) => handleFilteredByTemp(e)}>
              <option value="all">All Temperaments</option>
              {
                temperaments.map((temperament) =>{
                  return(
                    <option value={temperament} key={temperament}>{temperament}</option>
                  )
                })
              }
            </select>
        </div>
        <div>
          <h6>Filter by breed</h6>
          <select onChange={(e) => handleFilteredByTemp(e)}>
              <option value="all">All Breeds</option>
              {
                temperaments.map((temperament) =>{
                  return(
                    <option value={temperament} key={temperament}>{temperament}</option>
                  )
                })
              }
            </select>
        </div>
        <div>
          <h6>Filter by max weight</h6>
          <input type='range' name='kilograms' list='kgList'/>
          <datalist>
              <option value='1' />
              <option value='5'/>
              <option value='10'/>
              <option value='20'/>
              <option value='40'/>
              <option value='60'/>
              <option value='100'/>
          </datalist>
        </div>
      </div>
    </Fragment>
  );
}
