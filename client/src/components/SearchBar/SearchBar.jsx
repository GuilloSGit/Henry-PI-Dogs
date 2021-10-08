import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions/index";
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsByName(name));
    setName(""); /* Buscar el método  correcto para acceder al elemento */
  }

  return (
    <div className={styles.searchBarObject}>
      <input
        type="text"
        placeholder="Search a dog..."
        onChange={(e) => handleInputChange(e)} className={styles.input}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        <span className="material-icons">search</span>
      </button>
    </div>
  );
}
