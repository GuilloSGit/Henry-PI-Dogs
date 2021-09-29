import { Fragment, React, useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  filterDogsByMAXWeight,
  filterDogsByMINWeight,
  filterCreated,
  orderByName
} from "../actions";
import { Link } from "react-router-dom";
import DogCard from "./DogCard";
import Pagination from "./Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [oreder, setOrder] = useState('');
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
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
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
      dispatch(filterCreated(e.target.value))
  }
  function handleSort(e) {
      e.preventDefault();
      dispatch(orderByName(e.target.value))
      setCurrentPage(1)
      setOrder(`Ordered ${e.target.value}`)
  }

  return (
    <div>
      <Link to="/dogs">Creat a dog</Link>
      <h1>Doguie Woof</h1>
      <div>
        <div className="filtersBox">
          <select onChange={(e) => handleSort(e)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <select onChange={(e) => handleFilteredMAXWeight(e)}>
            <option value="all">All Woofs</option>
            <option value="1">1 kg</option>
            <option value="2">2 kg</option>
            <option value="3">3 kg</option>
            <option value="4">4 kg</option>
            <option value="5">5 kg</option>
            <option value="6">6 kg</option>
            <option value="7">7 kg</option>
            <option value="8">8 kg</option>
            <option value="9">9 kg</option>
            <option value="10">10 kg</option>
            <option value="11">11 kg</option>
            <option value="12">12 kg</option>
            <option value="13">13 kg</option>
            <option value="14">14 kg</option>
            <option value="15">15 kg</option>
            <option value="16">16 kg</option>
            <option value="17">17 kg</option>
            <option value="18">18 kg</option>
            <option value="19">19 kg</option>
            <option value="20">20 kg</option>
            <option value="21">21 kg</option>
            <option value="22">22 kg</option>
            <option value="23">23 kg</option>
            <option value="24">24 kg</option>
            <option value="25">25 kg</option>
            <option value="26">26 kg</option>
            <option value="27">27 kg</option>
            <option value="28">28 kg</option>
            <option value="29">29 kg</option>
            <option value="30">30 kg</option>
            <option value="31">31 kg</option>
            <option value="32">32 kg</option>
            <option value="33">33 kg</option>
            <option value="34">34 kg</option>
            <option value="35">35 kg</option>
            <option value="36">36 kg</option>
            <option value="37">37 kg</option>
            <option value="38">38 kg</option>
            <option value="39">39 kg</option>
            <option value="40">40 kg</option>
            <option value="41">41 kg</option>
            <option value="42">42 kg</option>
            <option value="43">43 kg</option>
            <option value="44">44 kg</option>
            <option value="45">45 kg</option>
            <option value="46">46 kg</option>
            <option value="47">47 kg</option>
            <option value="48">48 kg</option>
            <option value="49">49 kg</option>
            <option value="50">50 kg</option>
            <option value="51">51 kg</option>
            <option value="52">52 kg</option>
            <option value="53">53 kg</option>
            <option value="54">54 kg</option>
            <option value="55">55 kg</option>
            <option value="56">56 kg</option>
            <option value="57">57 kg</option>
            <option value="58">58 kg</option>
            <option value="59">59 kg</option>
            <option value="60">60 kg</option>
            <option value="61">61 kg</option>
            <option value="62">62 kg</option>
            <option value="63">63 kg</option>
            <option value="64">64 kg</option>
            <option value="65">65 kg</option>
            <option value="66">66 kg</option>
            <option value="67">67 kg</option>
            <option value="68">68 kg</option>
            <option value="69">69 kg</option>
            <option value="70">70 kg</option>
            <option value="71">71 kg</option>
            <option value="72">72 kg</option>
            <option value="73">73 kg</option>
            <option value="74">74 kg</option>
            <option value="75">75 kg</option>
            <option value="76">76 kg</option>
            <option value="77">77 kg</option>
            <option value="78">78 kg</option>
            <option value="79">79 kg</option>
            <option value="80">80 kg</option>
            <option value="81">81 kg</option>
            <option value="82">82 kg</option>
            <option value="83">83 kg</option>
            <option value="84">84 kg</option>
            <option value="85">85 kg</option>
            <option value="86">86 kg</option>
            <option value="87">87 kg</option>
            <option value="88">88 kg</option>
            <option value="89">89 kg</option>
            <option value="90">90 kg</option>
            <option value="91">91 kg</option>
          </select>
          <select onChange={(e) => handleFilteredMINWeight(e)}>
            <option value="all">All Woofs</option>
            <option value="1">1 kg</option>
            <option value="2">2 kg</option>
            <option value="3">3 kg</option>
            <option value="4">4 kg</option>
            <option value="5">5 kg</option>
            <option value="6">6 kg</option>
            <option value="7">7 kg</option>
            <option value="8">8 kg</option>
            <option value="9">9 kg</option>
            <option value="10">10 kg</option>
            <option value="11">11 kg</option>
            <option value="12">12 kg</option>
            <option value="13">13 kg</option>
            <option value="14">14 kg</option>
            <option value="15">15 kg</option>
            <option value="16">16 kg</option>
            <option value="17">17 kg</option>
            <option value="18">18 kg</option>
            <option value="19">19 kg</option>
            <option value="20">20 kg</option>
            <option value="21">21 kg</option>
            <option value="22">22 kg</option>
            <option value="23">23 kg</option>
            <option value="24">24 kg</option>
            <option value="25">25 kg</option>
            <option value="26">26 kg</option>
            <option value="27">27 kg</option>
            <option value="28">28 kg</option>
            <option value="29">29 kg</option>
            <option value="30">30 kg</option>
            <option value="31">31 kg</option>
            <option value="32">32 kg</option>
            <option value="33">33 kg</option>
            <option value="34">34 kg</option>
            <option value="35">35 kg</option>
            <option value="36">36 kg</option>
            <option value="37">37 kg</option>
            <option value="38">38 kg</option>
            <option value="39">39 kg</option>
            <option value="40">40 kg</option>
            <option value="41">41 kg</option>
            <option value="42">42 kg</option>
            <option value="43">43 kg</option>
            <option value="44">44 kg</option>
            <option value="45">45 kg</option>
            <option value="46">46 kg</option>
            <option value="47">47 kg</option>
            <option value="48">48 kg</option>
            <option value="49">49 kg</option>
            <option value="50">50 kg</option>
            <option value="51">51 kg</option>
            <option value="52">52 kg</option>
            <option value="53">53 kg</option>
            <option value="54">54 kg</option>
            <option value="55">55 kg</option>
            <option value="56">56 kg</option>
            <option value="57">57 kg</option>
            <option value="58">58 kg</option>
            <option value="59">59 kg</option>
            <option value="60">60 kg</option>
            <option value="61">61 kg</option>
            <option value="62">62 kg</option>
            <option value="63">63 kg</option>
            <option value="64">64 kg</option>
            <option value="65">65 kg</option>
            <option value="66">66 kg</option>
            <option value="67">67 kg</option>
            <option value="68">68 kg</option>
            <option value="69">69 kg</option>
            <option value="70">70 kg</option>
            <option value="71">71 kg</option>
            <option value="72">72 kg</option>
            <option value="73">73 kg</option>
            <option value="74">74 kg</option>
            <option value="75">75 kg</option>
            <option value="76">76 kg</option>
            <option value="77">77 kg</option>
            <option value="78">78 kg</option>
            <option value="79">79 kg</option>
            <option value="80">80 kg</option>
            <option value="81">81 kg</option>
            <option value="82">82 kg</option>
            <option value="83">83 kg</option>
            <option value="84">84 kg</option>
            <option value="85">85 kg</option>
            <option value="86">86 kg</option>
            <option value="87">87 kg</option>
            <option value="88">88 kg</option>
            <option value="89">89 kg</option>
            <option value="90">90 kg</option>
            <option value="91">91 kg</option>
          </select>
          <select onChange={(e) => handleFilterCreated(e)}>
            <option value="all">All Woofs</option>
            <option value="created">Your Woofs</option>
            <option value="inDB">Woofs dbase</option>
          </select>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Retrieve all dogs
          </button>
          <Pagination
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            pagination={pagination}
          />
          {currentDogs?.map((el) => {
            return (
              <Fragment>
                  <DogCard
                    name={el.name}
                    image={el.image}
                    temperament={el.temperament}
                    breed_group={el.breed_group}
                    key={Math.floor(Math.random() * (100 - 0)) + 0}
                  />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
