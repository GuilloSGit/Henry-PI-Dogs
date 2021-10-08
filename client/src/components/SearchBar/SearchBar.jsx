import React from "react";
import styles from './SearchBar.module.css'

export default function SearchBar() {

  return (
    <div className={styles.searchBarObject}>
      <input
        type="text"
        placeholder="Search a dog..."
        className={styles.input}
      />
      <button type="submit">
        <span className="material-icons">search</span>
      </button>
    </div>
  );
}
