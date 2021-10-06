import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions/index";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
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
