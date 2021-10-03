import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function DogCreation() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [input, setInput] = useState({
    name: "",
    image: "",
    breed_group: "",
    temperament: [],
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_life_span: "",
    max_life_span: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        temperament: e.target.value,
      });
    }
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Creat your Woof</h1>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Breed group</label>
          <input
            type="text"
            value={input.breed_group}
            name="breed_group"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Min height</label>
          <input
            type="text"
            value={input.min_height}
            name="min_height"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Max height</label>
          <input
            type="text"
            value={input.max_height}
            name="max_height"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Min weight</label>
          <input
            type="text"
            value={input.min_weight}
            name="min_weight"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Max weight</label>
          <input
            type="text"
            value={input.max_weight}
            name="max_weight"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Min life-span</label>
          <input
            type="text"
            value={input.min_life_span}
            name="min_life_span"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Max life-span</label>
          <input
            type="text"
            value={input.max_life_span}
            name="max_life_span"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div>
            <label>Breed</label>
            <label>
              <input type="radio" name="" />
            </label>
        </div>
        <select multiple>
          {temperaments.map((temperaments) => {
            if (temperaments) {
              return (
                <option value={temperaments} key={temperaments}>
                  {temperaments}
                </option>
              );
            }
          })}
        </select>
        <button type="submit">🦴 Creat 🦴</button>
      </form>
    </div>
  );
}
