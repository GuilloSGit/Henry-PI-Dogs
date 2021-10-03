import { Fragment, React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  filterDogsByMAXWeight,
  filterDogsByMINWeight,
  filterDogsByTemperament,
  filterCreated,
  orderByName,
  getTemperaments,
} from "../actions";
import { Link } from "react-router-dom";
import DogCard from "./DogCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  /***********************/

  // Pág 1 slice(0,8)
  // Pág 2 slice(8,16)
  // Pág 3 slice(16,24) ...
  /***********************/

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
  function handleFilteredMAXWeight(e) {
    e.preventDefault();
    dispatch(filterDogsByMAXWeight(e.target.value));
  }
  function handleFilteredMINWeight(e) {
    e.preventDefault();
    dispatch(filterDogsByMINWeight(e.target.value));
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }

  return (
    <div>
      <h1 className="mainTitle">Woof</h1><h3 className="subTitle">the dog´s page</h3>
      <div>
        <div className="navBar">
          <div className="filtersBox">
            <select onChange={(e) => handleSort(e)} >
              <option value="asc">A-Z ↧</option>
              <option value="desc">Z-A ↥</option>
            </select>
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
            <select onChange={(e) => handleFilteredMAXWeight(e)}>
              <option value="all">Max ⚖️</option>
              {
                allDogs.map((dog) =>{
                  return(
                    <option value={dog.max_weight} key={dog.id}>{dog.max_weight} kg</option>
                  )
                })
              }
            </select>
            <select onChange={(e) => handleFilteredMINWeight(e)}>
              <option value="all">Min ⚖️</option>
              {
                allDogs.map((dog) =>{
                  return(
                    <option value={dog.min_weight} key={dog.id}>{dog.min_weight} kg</option>
                  )
                })
              }
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="all">All 🐶</option>
              <option value="created">Yours 🐶</option>
              <option value="inDB">dbase 🐶</option>
            </select>
          </div>
            <div className="buttons">
              <SearchBar/>
              <Link to="/dog" className="tooltip">
                <span className="material-icons addDog">add_circle</span>
                <span className="tooltiptext">Add your Woof 🐕</span>
              </Link>
              <div className="tooltip"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                <span className="material-icons refresh">loop</span>
                <span className="tooltiptext">Refresh all</span>
              </div>
            </div>
          </div>
          <div>
          <Pagination
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            pagination={pagination}
          />
          </div>
        <div className="body_container">
          <div className="dogDeployArea">
            {currentDogs?.map((el) => {
              return (
                  <DogCard className="dogaCard"
                    name={el.name}
                    image={el.image? el.image : el.image}
                    temperament={el.temperament}
                    breed_group={el.breed_group}
                    key={el.id}
                  />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
