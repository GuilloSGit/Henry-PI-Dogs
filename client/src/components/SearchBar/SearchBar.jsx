import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [dogState, setDogsState] = useState("");
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    
    if (dogState.length === 0) {
      return alert("Please input a name to start the search");
    } else {
      dispatch(getDogsByName(dogState));
      setDogsState("");
    }
  }

  return (
    <div className={styles.searchBarObject}>
      <input
        type="text"
        placeholder="Search a dog..."
        className={styles.input}
        value={dogState}
        onChange={(e) => setDogsState(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>
        <span className="material-icons">search</span>
      </button>
    </div>
  );
}
