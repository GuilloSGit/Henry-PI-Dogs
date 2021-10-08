import React, { Fragment } from "react";
import DogCard from "../DogCard/DogCard";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import styles from "./DogArea.module.css";

export default function DogArea() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);


  return (
    <Fragment>
      <div className={styles.dogsArea}>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          pagination={pagination}
        />
        <div className={styles.pagination}></div>
        {
          currentDogs.map((el) => (
          <DogCard
            key={el.id}
            name={el.name}
            image={el.image}
            temperament={el.temperament}
          />
        ))}
      </div>
    </Fragment>
  );
}
